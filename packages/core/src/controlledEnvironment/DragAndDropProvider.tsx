import * as React from 'react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  DragAndDropContextProps,
  DraggingPosition,
  TreeItem,
  TreeItemIndex,
} from '../types';
import { useTreeEnvironment } from './ControlledTreeEnvironment';
import { useCanDropAt } from './useCanDropAt';
import { useGetViableDragPositions } from './useGetViableDragPositions';
import { useSideEffect } from '../useSideEffect';
import { buildMapForTrees } from '../utils';
import { useCallSoon } from '../useCallSoon';
import { computeItemHeight } from './layoutUtils';
import { useStableHandler } from '../useStableHandler';
import { useGetOriginalItemOrder } from '../useGetOriginalItemOrder';
import { DraggingPositionEvaluator } from './DraggingPositionEvaluator';
import { useGetGetParentOfLinearItem } from './useGetParentOfLinearItem';

const DragAndDropContext = React.createContext<DragAndDropContextProps>(
  null as any
);
export const useDragAndDrop = () => React.useContext(DragAndDropContext);

// TODO tidy up
export const DragAndDropProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const environment = useTreeEnvironment();
  const [isProgrammaticallyDragging, setIsProgrammaticallyDragging] =
    useState(false);
  const [viableDragPositions, setViableDragPositions] = useState<{
    [treeId: string]: DraggingPosition[];
  }>({});
  const [programmaticDragIndex, setProgrammaticDragIndex] = useState(0);
  const [draggingPosition, setDraggingPosition] = useState<DraggingPosition>();
  const getViableDragPositions = useGetViableDragPositions();
  const callSoon = useCallSoon();
  const getOriginalItemOrder = useGetOriginalItemOrder();
  const getParentOfLinearItem = useGetGetParentOfLinearItem();

  const [dropPositionEvaluator, setDropPositionEvaluator] = useState<
    DraggingPositionEvaluator | undefined
  >(undefined);

  const resetProgrammaticDragIndexForCurrentTree = useCallback(
    (
      viableDragPositions: DraggingPosition[],
      draggingItems: TreeItem[] | undefined
    ) => {
      if (
        environment.activeTreeId &&
        environment.viewState[environment.activeTreeId]?.focusedItem &&
        environment.linearItems &&
        draggingItems
      ) {
        const focusItem =
          environment.viewState[environment.activeTreeId]!.focusedItem;
        const treeDragPositions = getViableDragPositions(
          environment.activeTreeId,
          draggingItems
        );
        const newPos = treeDragPositions.findIndex(pos => {
          if (pos.targetType === 'item') {
            return pos.targetItem === focusItem;
          }
          if (pos.targetType === 'between-items') {
            return (
              environment.items[pos.parentItem].children![pos.childIndex] ===
              focusItem
            );
          }
          return false;
        });

        if (newPos) {
          setProgrammaticDragIndex(
            Math.min(newPos + 1, treeDragPositions.length - 1)
          );
        } else {
          setProgrammaticDragIndex(0);
        }
      } else {
        setProgrammaticDragIndex(0);
      }
    },
    [
      environment.activeTreeId,
      environment.items,
      environment.linearItems,
      environment.viewState,
      getViableDragPositions,
    ]
  );

  const resetState = useCallback(() => {
    setIsProgrammaticallyDragging(false);
    setViableDragPositions({});
    setProgrammaticDragIndex(0);
    setDraggingPosition(undefined);
    setDropPositionEvaluator(undefined);
  }, []);

  useSideEffect(
    () => {
      if (
        environment.activeTreeId &&
        environment.linearItems[environment.activeTreeId] &&
        viableDragPositions[environment.activeTreeId]
      ) {
        resetProgrammaticDragIndexForCurrentTree(
          viableDragPositions[environment.activeTreeId],
          dropPositionEvaluator?.draggingItems
        );
      }
    },
    [
      dropPositionEvaluator?.draggingItems,
      environment.activeTreeId,
      environment.linearItems,
      resetProgrammaticDragIndexForCurrentTree,
      viableDragPositions,
    ],
    [environment.activeTreeId]
  );

  useSideEffect(
    () => {
      if (isProgrammaticallyDragging && environment.activeTreeId) {
        setDraggingPosition(
          viableDragPositions[environment.activeTreeId][programmaticDragIndex]
        );
      }
    },
    [
      programmaticDragIndex,
      environment.activeTreeId,
      isProgrammaticallyDragging,
      viableDragPositions,
    ],
    [programmaticDragIndex, environment.activeTreeId]
  );

  const canDropAt = useCanDropAt();

  const performDrag = (draggingPosition: DraggingPosition) => {
    if (
      dropPositionEvaluator?.draggingItems &&
      !canDropAt(draggingPosition, dropPositionEvaluator.draggingItems)
    ) {
      return;
    }

    setDraggingPosition(draggingPosition);
    environment.setActiveTree(draggingPosition.treeId);

    if (
      dropPositionEvaluator?.draggingItems &&
      environment.activeTreeId !== draggingPosition.treeId
    ) {
      // TODO maybe do only if draggingItems are different to selectedItems
      environment.onSelectItems?.(
        dropPositionEvaluator.draggingItems.map(item => item.index),
        draggingPosition.treeId
      );
    }
  };

  const onDragOverTreeHandler = useStableHandler(
    (
      e: DragEvent,
      treeId: string,
      containerRef: React.MutableRefObject<HTMLElement | undefined>
    ) => {
      if (!dropPositionEvaluator) return;
      const newDraggingPosition = dropPositionEvaluator.getDraggingPosition(
        e,
        treeId,
        containerRef
      );
      if (!newDraggingPosition) {
        setDraggingPosition(undefined);
        return;
      }
      performDrag(newDraggingPosition);
    }
  );

  const onDropHandler = useStableHandler(() => {
    const draggingItems = dropPositionEvaluator?.draggingItems;
    if (draggingItems && draggingPosition && environment.onDrop) {
      environment.onDrop(draggingItems, draggingPosition);

      callSoon(() => {
        environment.onFocusItem?.(draggingItems[0], draggingPosition.treeId);
        resetState();
      });
    }
  });

  const onStartDraggingItems = useCallback(
    (items, treeId) => {
      const treeViableDragPositions = buildMapForTrees(
        environment.treeIds,
        treeId => getViableDragPositions(treeId, items)
      );

      setDropPositionEvaluator(
        new DraggingPositionEvaluator(
          environment,
          getParentOfLinearItem,
          items,
          computeItemHeight(treeId)
        )
      );

      // TODO what if trees have different heights and drag target changes?
      setViableDragPositions(treeViableDragPositions);

      if (environment.activeTreeId) {
        resetProgrammaticDragIndexForCurrentTree(
          treeViableDragPositions[environment.activeTreeId],
          items
        );
      }
    },
    [
      environment,
      getParentOfLinearItem,
      getViableDragPositions,
      resetProgrammaticDragIndexForCurrentTree,
    ]
  );

  const startProgrammaticDrag = useCallback(() => {
    if (!environment.canDragAndDrop) {
      return;
    }

    if (environment.activeTreeId) {
      const draggingItems =
        environment.viewState[environment.activeTreeId]?.selectedItems ??
        ([
          environment.viewState[environment.activeTreeId]?.focusedItem,
        ] as TreeItemIndex[]);

      if (draggingItems.length === 0 || draggingItems[0] === undefined) {
        return;
      }

      const resolvedDraggingItems = getOriginalItemOrder(
        environment.activeTreeId,
        draggingItems.map(id => environment.items[id])
      );

      if (environment.canDrag && !environment.canDrag(resolvedDraggingItems)) {
        return;
      }

      onStartDraggingItems(resolvedDraggingItems, environment.activeTreeId);
      setTimeout(() => {
        setIsProgrammaticallyDragging(true);
        // Needs to be done after onStartDraggingItems was called, so that viableDragPositions is populated
      });
    }
  }, [environment, getOriginalItemOrder, onStartDraggingItems]);

  const abortProgrammaticDrag = useCallback(() => {
    resetState();
  }, [resetState]);

  const completeProgrammaticDrag = useCallback(() => {
    onDropHandler();
    resetState();
  }, [onDropHandler, resetState]);

  const programmaticDragUp = useCallback(() => {
    setProgrammaticDragIndex(oldIndex => Math.max(0, oldIndex - 1));
  }, []);

  const programmaticDragDown = useCallback(() => {
    if (environment.activeTreeId) {
      setProgrammaticDragIndex(oldIndex =>
        Math.min(
          viableDragPositions[environment.activeTreeId!].length,
          oldIndex + 1
        )
      );
    }
  }, [environment.activeTreeId, viableDragPositions]);

  const dnd = useMemo<DragAndDropContextProps>(
    () => ({
      onStartDraggingItems,
      startProgrammaticDrag,
      abortProgrammaticDrag,
      completeProgrammaticDrag,
      programmaticDragUp,
      programmaticDragDown,
      draggingItems: dropPositionEvaluator?.draggingItems,
      draggingPosition,
      itemHeight: dropPositionEvaluator?.itemHeight ?? 4,
      isProgrammaticallyDragging,
      onDragOverTreeHandler,
      viableDragPositions,
    }),
    [
      onStartDraggingItems,
      startProgrammaticDrag,
      abortProgrammaticDrag,
      completeProgrammaticDrag,
      programmaticDragUp,
      programmaticDragDown,
      dropPositionEvaluator?.draggingItems,
      dropPositionEvaluator?.itemHeight,
      draggingPosition,
      isProgrammaticallyDragging,
      onDragOverTreeHandler,
      viableDragPositions,
    ]
  );

  useEffect(() => {
    window.addEventListener('dragend', resetState);
    window.addEventListener('drop', onDropHandler);
    return () => {
      window.removeEventListener('dragend', resetState);
      window.removeEventListener('drop', onDropHandler);
    };
  }, [onDropHandler, resetState]);

  return (
    <DragAndDropContext.Provider value={dnd}>
      {children}
    </DragAndDropContext.Provider>
  );
};

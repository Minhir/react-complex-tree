import * as React from 'react';
import {
  CompleteTreeDataProvider,
  ControlledTreeEnvironmentProps,
  ImplicitDataSource,
  TreeConfiguration, TreeDataProvider, TreeItem, TreeItemIndex,
  UncontrolledTreeEnvironmentProps,
} from '../types';
import { useEffect, useMemo, useState } from 'react';
import { ControlledTreeEnvironment, TreeEnvironmentContext } from '../controlledEnvironment/ControlledTreeEnvironment';

const createCompleteDataProvider = (provider: TreeDataProvider): CompleteTreeDataProvider => ({
  ...provider,
  onDidChangeTreeData: provider.onDidChangeTreeData ?? (() => {}),
  getTreeItems: provider.getTreeItems ?? (itemIds => Promise.all(itemIds.map(id => provider.getTreeItem(id)))),
  onRenameItem: provider.onRenameItem ?? (() => {}),
});

export const UncontrolledTreeEnvironment = <T extends any>(props: UncontrolledTreeEnvironmentProps<T>) => {
  const [currentItems, setCurrentItems] = useState<Record<TreeItemIndex, TreeItem<T>>>({});
  const [viewState, setViewState] = useState(props.viewState);
  const dataProvider = createCompleteDataProvider(props.dataProvider);

  const writeItems = useMemo(() => (newItems: Record<TreeItemIndex, TreeItem<T>>) => {
    setCurrentItems({ ...currentItems, ...newItems });
  }, [currentItems]);

  console.log(viewState)

  return (
    <ControlledTreeEnvironment
      {...props}
      viewState={viewState}
      items={currentItems}
      onExpandItem={item => {
        //const itemsToLoad = item.children?.filter(itemId => currentItems[itemId] === undefined) ?? [];
        //dataProvider.getTreeItems(itemsToLoad).then(items => {
        //  writeItems(items.map(item => ({ [item.index]: item })).reduce((a, b) => ({...a, ...b}), {}));
          setViewState(viewState => ({ ...viewState, expandedItems: [...viewState.expandedItems ?? [], item.index] }));
        //});
      }}
      onCollapseItem={item => {
        setViewState(viewState => ({ ...viewState, expandedItems: viewState.expandedItems?.filter(id => id !== item.index) }));
      }}
      onSelectItems={items => {
        setViewState(viewState => ({ ...viewState, selectedItems: items }));
      }}
      onStartRenamingItem={item => {
        setViewState(viewState => ({ ...viewState, renamingItem: item.index }));
      }}
      onRenameItem={(item, name) => {
        dataProvider.onRenameItem(item, name);
        setViewState(viewState => ({ ...viewState, renamingItem: undefined }));
      }}
      onMissingItems={itemIds => {
        dataProvider.getTreeItems(itemIds).then(items => {
          writeItems(items.map(item => ({ [item.index]: item })).reduce((a, b) => ({...a, ...b}), {}));
        });
      }}
      // onRegisterTree={tree => {
      //   dataProvider.getTreeItem(tree.rootItem).then(item => writeItems({ [item.index]: item }));
      // }}
    >
      {props.children}
    </ControlledTreeEnvironment>
  );
};

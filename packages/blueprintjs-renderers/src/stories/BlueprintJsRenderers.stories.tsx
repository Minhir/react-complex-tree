import { Meta } from '@storybook/react';
import React from 'react';
import {
  InteractionMode,
  StaticTreeDataProvider,
  Tree,
  UncontrolledTreeEnvironment,
} from 'react-complex-tree';
import { longTree, shortTree } from 'demodata';
import { Colors, FocusStyleManager } from '@blueprintjs/core';
import { renderers } from '../renderers';

FocusStyleManager.onlyShowFocusOnTabs();

// import '@blueprintjs/core/lib/css/blueprint.css';

export default {
  title: 'BlueprintJs Renderers/BlueprintJs Renderers',
  decorators: [
    Story => (
      <>
        <link href="https://unpkg.com/normalize.css@^8.0.1" rel="stylesheet" />
        <link
          href="https://unpkg.com/@blueprintjs/core@^4.0.0/lib/css/blueprint.css"
          rel="stylesheet"
        />
        <Story />
      </>
    ),
  ],
} as Meta;

export const BlueprintJsTree = () => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div
    style={{ background: Colors.LIGHT_GRAY5 }}
    onMouseDown={() => FocusStyleManager.onlyShowFocusOnTabs()}
    onKeyDown={() => FocusStyleManager.alwaysShowFocus()}
  >
    <UncontrolledTreeEnvironment<string>
      canDragAndDrop
      canDropOnItemWithChildren
      canReorderItems
      dataProvider={
        new StaticTreeDataProvider(longTree.items, (item, data) => ({
          ...item,
          data,
        }))
      }
      getItemTitle={item => item.data}
      viewState={{
        'tree-1': {
          expandedItems: [
            'Fruit',
            'Meals',
            'America',
            'Europe',
            'Asia',
            'Desserts',
          ],
        },
      }}
      {...renderers}
    >
      <Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
    </UncontrolledTreeEnvironment>
  </div>
);

export const ShortBlueprintJsTree = () => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div
    style={{ background: Colors.LIGHT_GRAY5 }}
    onMouseDown={() => FocusStyleManager.onlyShowFocusOnTabs()}
    onKeyDown={() => FocusStyleManager.alwaysShowFocus()}
  >
    <UncontrolledTreeEnvironment<string>
      canDragAndDrop
      canDropOnItemWithChildren
      canReorderItems
      dataProvider={
        new StaticTreeDataProvider(shortTree.items, (item, data) => ({
          ...item,
          data,
        }))
      }
      getItemTitle={item => item.data}
      viewState={{
        'tree-1': {
          expandedItems: ['container'],
        },
      }}
      {...renderers}
    >
      <Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
    </UncontrolledTreeEnvironment>
  </div>
);

export const BlueprintJsTreeWithClickArrowToExpand = () => (
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  <div
    style={{ background: Colors.LIGHT_GRAY5 }}
    onMouseDown={() => FocusStyleManager.onlyShowFocusOnTabs()}
    onKeyDown={() => FocusStyleManager.alwaysShowFocus()}
  >
    <UncontrolledTreeEnvironment<string>
      canDragAndDrop
      canDropOnItemWithChildren
      canReorderItems
      dataProvider={
        new StaticTreeDataProvider(longTree.items, (item, data) => ({
          ...item,
          data,
        }))
      }
      getItemTitle={item => item.data}
      defaultInteractionMode={InteractionMode.ClickArrowToExpand}
      viewState={{
        'tree-1': {},
      }}
      {...renderers}
    >
      <Tree treeId="tree-1" rootItem="root" treeLabel="Tree Example" />
    </UncontrolledTreeEnvironment>
  </div>
);

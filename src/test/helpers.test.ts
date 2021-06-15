import { TreeEnvironmentConfiguration } from '../types';
import {
  countVisibleChildrenIncludingSelf,
  getItemPathAtLinearIndex,
  getLinearIndexOfItem,
} from '../helpers';

describe('helpers', function () {
  let env: TreeEnvironmentConfiguration = null as any;

  beforeEach(() => {
    env = {
      data: {
        items: {
          root: {
            index: 'root',
            hasChildren: true,
            children: ['child1', 'child2'],
            data: 'root',
          },
          child1: {
            index: 'child1',
            hasChildren: true,
            children: ['child11'],
            data: 'child1',
          },
          child2: {
            index: 'child2',
            hasChildren: true,
            children: ['child21'],
            data: 'child2',
          },
          child21: {
            index: 'child21',
            hasChildren: false,
            data: 'child21',
          },
          child11: {
            index: 'child11',
            hasChildren: true,
            children: ['child111', 'child112'],
            data: 'child11',
          },
          child111: {
            index: 'child111',
            hasChildren: false,
            data: 'child111',
          },
          child112: {
            index: 'child112',
            hasChildren: true,
            children: ['child1121'],
            data: 'child112',
          },
          child1121: {
            index: 'child1121',
            hasChildren: false,
            data: 'child1121',
          },
        }
      },
      expandedItems: [
        'root',
        'child1',
        'child2',
        'child11',
      ]
    } as Pick<TreeEnvironmentConfiguration, 'data' | 'expandedItems'> as any;
  });

  describe('countVisibleChildrenIncludingSelf', function () {
    it('should count the visible items correctly', function () {
      expect(countVisibleChildrenIncludingSelf(env, 'root')).toEqual(7);
      expect(countVisibleChildrenIncludingSelf(env, 'child1')).toEqual(4);
      expect(countVisibleChildrenIncludingSelf(env, 'child11')).toEqual(3);
      expect(countVisibleChildrenIncludingSelf(env, 'child112')).toEqual(1);
    });
  });
  /*
   * v root
   *   v child1
   *     v child11
   *       > child111
   *       > child112
   *         > child1121
   *   v child2
   *     > child21
   */

  describe('getLinearIndexOfItem', function () {
    it('should get the linear index of an item correctly', function () {
      expect(getLinearIndexOfItem(env, 'root')).toEqual(0);
      expect(getLinearIndexOfItem(env, 'child1')).toEqual(1);
      expect(getLinearIndexOfItem(env, 'child11')).toEqual(2);
      expect(getLinearIndexOfItem(env, 'child112')).toEqual(4);
      expect(getLinearIndexOfItem(env, 'child21')).toEqual(6);
    });
  });

  describe('getItemPathAtLinearIndex', function () {
    it('should get the path for a linear index correctly', function () {
      expect(getItemPathAtLinearIndex(env, 'root', 0)).toEqual(['root']);
      expect(getItemPathAtLinearIndex(env, 'root', 1)).toEqual(['root', 'child1']);
      expect(getItemPathAtLinearIndex(env, 'root', 2)).toEqual(['root', 'child1', 'child11']);
      expect(getItemPathAtLinearIndex(env, 'root', 4)).toEqual(['root', 'child1', 'child11', 'child112']);
      expect(getItemPathAtLinearIndex(env, 'root', 6)).toEqual(['root', 'child2', 'child21']);
    });
  });
});
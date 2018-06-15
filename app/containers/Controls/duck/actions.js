import types from './types';

export const mapModeSet = mode => ({
  type: types.MAP_MODE_SET,
  mode
});

export const setGridMode = boolean => ({
  type: types.GRID_MODE_SET,
  boolean
});

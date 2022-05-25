export const SET_PLAYER_INFO = 'SET_PLAYER_INFO';

export const setPlayer = (state) => ({
  type: 'SET_PLAYER_INFO',
  ...state,
});

export const SET_PLAYER_INFO = 'SET_PLAYER_INFO';
export const SET_SCORE = 'SET_SCORE';

export const setPlayer = (state) => ({
  type: 'SET_PLAYER_INFO',
  ...state,
});

export const setScore = (state) => ({
  type: 'SET_SCORE',
  ...state,
});

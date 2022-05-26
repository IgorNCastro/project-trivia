import { SET_PLAYER_INFO, SET_SCORE, RESET_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_PLAYER_INFO:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
    };
  case SET_SCORE:
    return {
      ...state,
      score: state.score + action.score,
      assertions: state.assertions + action.assertions,
    };
  case RESET_SCORE:
    return {
      ...state,
      score: action.score,
      assertions: action.assertions,
    };
  default:
    return state;
  }
};

export default player;

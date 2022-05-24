const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  },
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'SET_USER_INFOS':
    return { ...state, player: action };
  default:
    return state;
  }
};

export default user;

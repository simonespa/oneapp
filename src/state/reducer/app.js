import { APP } from '../action-types';

const defaultState = {
  name: '',
  version: '',
};

export default function app(state = defaultState, action) {
  switch (action.type) {
    case APP.UPDATE_NAME:
      return { ...state, name: action.name };
    case APP.UPDATE_VERSION:
      return { ...state, version: action.version };
    default:
      return state;
  }
}

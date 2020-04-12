import { APP } from '../action-types';

export function updateProgrammeId(name) {
  return {
    type: APP.UPDATE_NAME,
    name,
  };
}

export function updateProgrammeTitle(version) {
  return {
    type: APP.UPDATE_VERSION,
    version,
  };
}

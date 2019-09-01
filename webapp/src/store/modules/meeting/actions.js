export function meetupLoad() {
  return {
    type: '@meeting/MEETING_LOAD_REQUEST',
  };
}

export function meetupLoadSuccess(data) {
  return {
    type: '@meeting/MEETING_LOAD_SUCCESS',
    payload: data,
  };
}

export function meetupRegisterRequest(data) {
  return {
    type: '@meeting/MEETING_REGISTER_REQUEST',
    payload: data,
  };
}

export function meetupRegisterSuccess(meet) {
  return {
    type: '@meeting/MEETING_REGISTER_SUCCESS',
    payload: meet,
  };
}

export function meetupFailed() {
  return {
    type: '@meeting/MEETING_REGISTER_FAILED',
  };
}

export function meetupUpdateRequest(data) {
  return {
    type: '@meeting/MEETING_UPDATE_REQUEST',
    payload: data,
  };
}

export function meetupUpdateSuccess(meet) {
  return {
    type: '@meeting/MEETING_UPDATE_SUCCESS',
    payload: meet,
  };
}

export function meetupDeleteRequest(id) {
  return {
    type: '@meeting/MEETING_DELETE_REQUEST',
    payload: id,
  };
}

export function meetupDeleteSuccess(id) {
  return {
    type: '@meeting/MEETING_DELETE_SUCCESS',
    payload: id,
  };
}

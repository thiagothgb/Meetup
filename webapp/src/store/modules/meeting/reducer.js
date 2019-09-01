import { produce } from 'immer';

const INITIAL_STATE = {
  meetings: [],
  loading: false,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meeting/MEETING_LOAD_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meeting/MEETING_LOAD_SUCCESS': {
        draft.meetings = action.payload;
        draft.loading = false;
        break;
      }
      case '@meeting/MEETING_REGISTER_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meeting/MEETING_REGISTER_SUCCESS': {
        draft.meetings.push(action.payload);
        draft.loading = false;
        break;
      }
      case '@meeting/MEETING_REGISTER_FAILED': {
        draft.loading = false;
        break;
      }
      case '@meeting/MEETING_UPDATE_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@meeting/MEETING_UPDATE_SUCCESS': {
        draft.meetings = draft.meetings.map(meeting =>
          meeting.id === action.payload.id ? action.payload : meeting
        );
        draft.loading = false;
        break;
      }
      case '@meeting/MEETING_DELETE_SUCCESS': {
        draft.meetings = draft.meetings.filter(
          item => item.id !== action.payload
        );
        break;
      }
      default:
    }
  });
}

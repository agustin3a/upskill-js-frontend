import {
  TRANSFER_API_CALL_COMPLETED,
  TRANSFER_API_CALL_STARTED,
  TRANSFER_API_CALL_ERROR,
  TRANSFER_ADD_TRANSFER,
  TRANSFER_API_CALL_RESET,
  TRANSFER_ADD_VALIDATE_TRANSFER,
} from "../actions/actionTypes";
const initialState = {
  transferValidate: {},
  currentTransfer: {},
  apiCallInProgress: false,
  apiCallCompleted: false,
  apiCallError: false,
  apiCallErrorMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TRANSFER_ADD_TRANSFER:
      return { ...state, currentTransfer: action.payload };
    case TRANSFER_ADD_VALIDATE_TRANSFER:
      return { ...state, transferValidate: action.payload };
    case TRANSFER_API_CALL_STARTED:
      return {
        ...state,
        apiCallInProgress: true,
        apiCallCompleted: false,
        apiCallError: false,
      };
    case TRANSFER_API_CALL_COMPLETED:
      return {
        ...state,
        apiCallInProgress: false,
        apiCallCompleted: true,
        apiCallError: false,
      };
    case TRANSFER_API_CALL_ERROR:
      return {
        ...state,
        apiCallInProgress: false,
        apiCallCompleted: false,
        apiCallError: true,
        apiCallErrorMessage: action.payload,
      };
    case TRANSFER_API_CALL_RESET:
      return {
        ...state,
        apiCallInProgress: false,
        apiCallCompleted: false,
        apiCallError: false,
      };
    default:
      return state;
  }
};

export default reducer;

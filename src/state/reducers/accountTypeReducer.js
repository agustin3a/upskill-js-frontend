import { ACCOUNT_TYPE_API_CALL_COMPLETED, ACCOUNT_TYPE_API_CALL_ERROR, ACCOUNT_TYPE_API_CALL_STARTED, ACCOUNT_TYPE_UPDATE_ACCOUNT_TYPES } from '../actions/actionTypes';
const initialState = { accountTypes: [], apiCallInProgress : false, apiCallCompleted : false, apiCallError: false, apiCallErrorMessage: "" };


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ACCOUNT_TYPE_UPDATE_ACCOUNT_TYPES:
            return { ...state, accountTypes: action.payload};
        case ACCOUNT_TYPE_API_CALL_STARTED:
            return { ...state, apiCallInProgress: true, apiCallCompleted: false, apiCallError : false };
        case ACCOUNT_TYPE_API_CALL_COMPLETED:
            return { ...state, apiCallInProgress: false, apiCallCompleted: true, apiCallError : false };
        case ACCOUNT_TYPE_API_CALL_ERROR:
            return { ...state, apiCallInProgress: false, apiCallCompleted: false, apiCallError : true, apiCallErrorMessage: action.payload };
        default:
            return state;
    }
};

export default reducer;
import { ACCOUNT_UPDATE_ACCOUNTS, ACCOUNT_API_CALL_STARTED, ACCOUNT_API_CALL_COMPLETED, ACCOUNT_API_CALL_ERROR } from '../actions/actionTypes';
const initialState = { accounts: [], apiCallInProgress : false, apiCallCompleted : false, apiCallError: false, apiCallErrorMessage: "" };


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ACCOUNT_UPDATE_ACCOUNTS:
            return { ...state, accounts: action.payload};
        case ACCOUNT_API_CALL_STARTED:
            return { ...state, apiCallInProgress: true, apiCallCompleted: false, apiCallError : false };
        case ACCOUNT_API_CALL_COMPLETED:
            return { ...state, apiCallInProgress: false, apiCallCompleted: true, apiCallError : false };
        case ACCOUNT_API_CALL_ERROR:
            return { ...state, apiCallInProgress: false, apiCallCompleted: false, apiCallError : true, apiCallErrorMessage: action.payload };
        default:
            return state;
    }
};

export default reducer;
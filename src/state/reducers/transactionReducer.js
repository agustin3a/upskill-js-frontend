import { TRANSACTION_UPDATE_LATEST_TRANSACTIONS, TRANSACTION_API_CALL_COMPLETED, TRANSACTION_API_CALL_STARTED, TRANSACTION_API_CALL_ERROR } from '../actions/actionTypes';
const initialState = { latestTransactions: [], transactionsFiterByDate: [], currentTransaction: {}, apiCallInProgress : false, apiCallCompleted : false, apiCallError: false, apiCallErrorMessage: "" };


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case TRANSACTION_UPDATE_LATEST_TRANSACTIONS:
            return { ...state, latestTransactions: action.payload};
        case TRANSACTION_API_CALL_STARTED:
            return { ...state, apiCallInProgress: true, apiCallCompleted: false, apiCallError : false };
        case TRANSACTION_API_CALL_COMPLETED:
            return { ...state, apiCallInProgress: false, apiCallCompleted: true, apiCallError : false };
        case TRANSACTION_API_CALL_ERROR:
            return { ...state, apiCallInProgress: false, apiCallCompleted: false, apiCallError : true, apiCallErrorMessage: action.payload };
        default:
            return state;
    }
};

export default reducer;
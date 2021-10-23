import { CURRENCY_API_CALL_COMPLETED, CURRENCY_API_CALL_ERROR, CURRENCY_API_CALL_STARTED, CURRENCY_UPDATE_CURRENCIES } from '../actions/actionTypes';
const initialState = { currencies: [], apiCallInProgress : false, apiCallCompleted : false, apiCallError: false, apiCallErrorMessage: "" };


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case CURRENCY_UPDATE_CURRENCIES:
            return { ...state, currencies: action.payload};
        case CURRENCY_API_CALL_STARTED:
            return { ...state, apiCallInProgress: true, apiCallCompleted: false, apiCallError : false };
        case CURRENCY_API_CALL_COMPLETED:
            return { ...state, apiCallInProgress: false, apiCallCompleted: true, apiCallError : false };
        case CURRENCY_API_CALL_ERROR:
            return { ...state, apiCallInProgress: false, apiCallCompleted: false, apiCallError : true, apiCallErrorMessage: action.payload };
        default:
            return state;
    }
};

export default reducer;
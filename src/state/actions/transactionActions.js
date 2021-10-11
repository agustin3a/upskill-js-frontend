import { TRANSACTION_UPDATE_LATEST_TRANSACTIONS, TRANSACTION_API_CALL_STARTED, TRANSACTION_API_CALL_COMPLETED, TRANSACTION_API_CALL_ERROR} from './actionTypes';
import Axios from 'axios';
Axios.defaults.baseURL = process.env.REACT_APP_BUDGET_API_URI;

export const getLatestTransactions = () => async (dispatch) => {
    dispatch({ type: TRANSACTION_API_CALL_STARTED });
    Axios.get( '/transactions')
    .then((response) => {
        dispatch({ type: TRANSACTION_UPDATE_LATEST_TRANSACTIONS, payload : response.data.transactions });
        dispatch({ type: TRANSACTION_API_CALL_COMPLETED});
    }).catch((error) => {
        console.error(error);
        if(error.response) {
            dispatch({ type: TRANSACTION_API_CALL_ERROR, payload : error.response.data.errorMessage});
        } else {
            dispatch({ type: TRANSACTION_API_CALL_ERROR, payload : 'Service unavailable'});
        }      
    });
};

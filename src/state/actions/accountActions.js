import { ACCOUNT_UPDATE_ACCOUNTS, ACCOUNT_API_CALL_STARTED, ACCOUNT_API_CALL_COMPLETED, ACCOUNT_API_CALL_ERROR } from './actionTypes';
import Axios from 'axios';
Axios.defaults.baseURL = process.env.REACT_APP_BUDGET_API_URI;

export const getAccounts = () => async (dispatch) => {
    dispatch({ type: ACCOUNT_API_CALL_STARTED });
    Axios.get( '/accounts')
    .then((response) => {
        dispatch({ type: ACCOUNT_UPDATE_ACCOUNTS, payload : response.data.accounts });
        dispatch({ type: ACCOUNT_API_CALL_COMPLETED});
    }).catch((error) => {
        console.error(error);
        if(error.response) {
            dispatch({ type: ACCOUNT_API_CALL_ERROR, payload : error.response.data.errorMessage});
        } else {
            dispatch({ type: ACCOUNT_API_CALL_ERROR, payload : 'Service unavailable'});
        }      
    });
};

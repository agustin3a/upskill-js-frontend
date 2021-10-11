import { CATEGORY_UPDATE_CATEGORIES, CATEGORY_API_CALL_STARTED, CATEGORY_API_CALL_COMPLETED, CATEGORY_API_CALL_ERROR} from './actionTypes';
import Axios from 'axios';
Axios.defaults.baseURL = process.env.REACT_APP_BUDGET_API_URI;

export const getCategories = () => async (dispatch) => {
    dispatch({ type: CATEGORY_API_CALL_STARTED });
    Axios.get( '/categories')
    .then((response) => {
        dispatch({ type: CATEGORY_UPDATE_CATEGORIES, payload : response.data.categories });
        dispatch({ type: CATEGORY_API_CALL_COMPLETED});
    }).catch((error) => {
        console.error(error);
        if(error.response) {
            dispatch({ type: CATEGORY_API_CALL_ERROR, payload : error.response.data.errorMessage});
        } else {
            dispatch({ type: CATEGORY_API_CALL_ERROR, payload : 'Service unavailable'});
        }      
    });
};

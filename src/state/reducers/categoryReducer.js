import { CATEGORY_UPDATE_CATEGORIES, CATEGORY_API_CALL_STARTED, CATEGORY_API_CALL_COMPLETED, CATEGORY_API_CALL_ERROR } from '../actions/actionTypes';
const initialState = { categories: [], apiCallInProgress : false, apiCallCompleted : false, apiCallError: false, apiCallErrorMessage: "" };


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case CATEGORY_UPDATE_CATEGORIES:
            return { ...state, categories: action.payload};
        case CATEGORY_API_CALL_STARTED:
            return { ...state, apiCallInProgress: true, apiCallCompleted: false, apiCallError : false };
        case CATEGORY_API_CALL_COMPLETED:
            return { ...state, apiCallInProgress: false, apiCallCompleted: true, apiCallError : false };
        case CATEGORY_API_CALL_ERROR:
            return { ...state, apiCallInProgress: false, apiCallCompleted: false, apiCallError : true, apiCallErrorMessage: action.payload };
        default:
            return state;
    }
};

export default reducer;
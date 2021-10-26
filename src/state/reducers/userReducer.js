import { USER_API_CALL_STARTED, USER_API_CALL_COMPLETED, USER_API_CALL_ERROR, USER_CREATED, USER_LOGOUT } from '../actions/actionTypes';
const initialState = { userCreated: false, apiCallInProgress : false, apiCallCompleted : false, apiCallError: false, apiCallErrorMessage: "" };


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'LOGIN':
            return { ...state, userCreated: true};
        case USER_LOGOUT:
            return { ...state, userCreated: false };
        case USER_API_CALL_STARTED:
            return { ...state, apiCallInProgress: true, apiCallCompleted: false, apiCallError : false };
        case USER_API_CALL_COMPLETED:
            return { ...state, apiCallInProgress: false, apiCallCompleted: true, apiCallError : false };
        case USER_API_CALL_ERROR:
            return { ...state, apiCallInProgress: false, apiCallCompleted: false, apiCallError : true, apiCallErrorMessage: action.payload };
        default:
            return state;
    }
};

export default reducer;
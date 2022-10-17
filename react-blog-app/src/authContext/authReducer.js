import {LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT,LOAD_USER_FAIL,LOAD_USER_SUCCESS} from "./constants"

const authReducer = (state,action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
               ...state,
               token:action.payload,
               isAuthenticated:true,
            }
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            }
            case LOGIN_FAIL:
            case  LOAD_USER_FAIL:
            case LOGOUT:
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                return{
                    ...state,
                    token:null,
                    isAuthenticated: false,
                    user:null,
                    error:action.payload
                }
       
        default:
            return  state;
    }

}

export default authReducer;
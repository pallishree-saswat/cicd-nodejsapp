import { useReducer } from "react";
import AuthContext from "./authContext"
import authReducer from "./authReducer";
import axios from "axios"
import {
    AUTH_ERROR,
    CLEAR_ERRORS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
} from "../constants";

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    }
    const [state, dispatch] = useReducer(authReducer, initialState);


    // Load User
    const loadUser = async () => {
        let token = state.token;
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            },
        };
        try {
            const res = await axios.get("http://localhost:8000/api/auth", config);
            dispatch({ type: USER_LOADED, payload: res.data.data });
        } catch (error) {
            dispatch({ type: AUTH_ERROR });
        }
    };
    // Register User

    const register = async (formData) => {
    
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.post("http://localhost:8000/api/auth/register", formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
            console.log("res", res.data)
            localStorage.setItem("myUser", JSON.stringify(res.data.data))
            localStorage.setItem("myToken", JSON.stringify(res.data.token))
        } catch (error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg,
            });
        }
    };
    const login = async (formData) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.post("http://localhost:8000/api/auth", formData, config);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data,
            });
            loadUser()
            localStorage.setItem("myUser", JSON.stringify(res.data.data))
            localStorage.setItem("myToken", JSON.stringify(res.data.token))
        } catch (error) {
            dispatch({
                type: LOGIN_FAIL,
                payload: error.response.data.msg,
            });
        }
    };
    //Logout
    const logout = () => {
        dispatch({ type: LOGOUT });
    };
    // Clear Errors
    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });
    return (
        <AuthContext.Provider
            value={{
                token: state.token,
                isAuthenticated: state.isAuthenticated,
                loading: state.loading,
                user: state.user,
                error: state.error,
                register,
                loadUser,
                login,
                logout,
                clearErrors,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState
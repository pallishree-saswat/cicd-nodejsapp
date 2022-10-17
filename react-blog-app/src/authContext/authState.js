import {useReducer,useEffect} from "react"
import AuthContext from "./index";
import authReducer from "./authReducer";
import axios from "axios";
import {  toast } from 'react-toastify';

import {LOAD_USER_FAIL, LOAD_USER_SUCCESS, LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT} from "./constants"

const AuthState = ({children}) =>{
    const initialState = {
        user:null,
        token:null,
        isAuthenticated:null
    };
  const [state,dispatch] = useReducer(authReducer,initialState);
 useEffect(() => {
  if(state.token === null && localStorage.getItem("token")){
      dispatch({
          type: LOGIN_SUCCESS,
          payload: JSON.parse(localStorage.getItem("token"))
      })
  }
     if (state.user === null && localStorage.getItem("user")) {
         dispatch({
             type: LOAD_USER_SUCCESS,
             payload: JSON.parse(localStorage.getItem("user"))
         })
     }
    
 }, [state])
 
   const loadUser = async (token) =>{
       const config = {
           headers: {
               "Authorization": `Bearer ${token}`
           },
       };
    try {
        const res = await axios.get("http://localhost:8000/api/profile", config);
        localStorage.setItem("user", JSON.stringify(res.data))
        dispatch({type:LOAD_USER_SUCCESS,payload:res.data});
    } catch (error) {
        console.log(error.response)
        toast(error.response.data.message)
        dispatch({type:LOAD_USER_FAIL});
    }
   }
  
   const login = async (formData) => {
    try {
        const config = {
            headers:{
                "Content-Type": "application/json",
            }, 
        }
        const res = await axios.post("http://localhost:8000/api/login",formData,config);
     dispatch({
        type:LOGIN_SUCCESS,
        payload:res.data.token
     })
        localStorage.setItem("token", JSON.stringify(res.data.token))
        loadUser(res.data.token);
    } catch (error) {
        console.log(error);
        toast(error.response.data.message)
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.message
        })
    }
   }

    const logout = () => {
        dispatch({ type: LOGOUT });
    };

  return (
    <AuthContext.Provider
    value={{
        token:state.token,
        isAuthenticated:state.isAuthenticated,
        user:state.user,
        login,
        logout,
        loadUser
    }}
    >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthState;
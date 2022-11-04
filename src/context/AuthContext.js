import { createContext, useReducer } from "react";
import { authReducer } from "../reducer/authReducer";
import axios from 'axios';
import { API_URL } from "../utils/constants";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        authLoading: true,
        authenticated: false,
        user: null
    })

    const loginUser = async loginForm => {
        try {
            const res = await axios.post(API_URL + '/auth/login', loginForm);
            if(res.data.success){
                localStorage.setItem('accessToken', res.data.access_token);
                dispatch( { type: "LOGIN", user_id: res.data.access_token } );
            }
            return res.data;
        } catch(err) {
            if(err.response.data) return err.response.data;
            else return { success: false, message: err.message }
        }
    }

    const loadUser = () => {
        dispatch( { type: "LOGIN", user_id: localStorage.getItem('accessToken') } )
    }

    const AuthContextData = {loginUser, loadUser};

    return (
        <AuthContext.Provider value={AuthContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
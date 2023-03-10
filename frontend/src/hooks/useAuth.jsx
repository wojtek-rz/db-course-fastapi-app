import React, { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";
import axios from "axios"
import { usePostRequest } from "./useRequest";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useLocalStorage("token", null);
    const navigate = useNavigate();

    // call this function when you want to authenticate the users
    const login = async ({ username, password }) => {
        const params = new URLSearchParams()
        params.append("username", username)
        params.append("password", password)

        // send post request to get access token, requiest body should be x-www-form-urlencoded
        const data = await usePostRequest('/login/access-token', params)

        setToken(data.access_token);
        navigate("/");
    };

    // call this function to sign out logged in users
    const logout = () => {
        setUser(null);
        navigate("/", { replace: true });
    };

    const value = useMemo(
        () => ({
            token,
            login,
            logout
        }),
        [token]
    );
    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>)
};

export const useAuth = () => {
    return useContext(AuthContext);
};
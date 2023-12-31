import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [uid, setUid] = useState(null);
    const [token, setToken] = useState(null);
    const [username, setUsername] = useState(null);
    const [email, setEmail] = useState(null);
    
    const addUid = (uid) => {
        setUid(uid);
        localStorage.setItem('uid', uid);
    }

    const addToken = (token) => {
        setToken(token);
        localStorage.setItem('token',token);
    }

    const addUsername = (username) => {
        setUsername(username);
        localStorage.setItem('username', username);
    }

    const addEmail = (email) => {
        setEmail(email);
        localStorage.setItem('email',email);
    }

    const logout = () => {
        setEmail(null);
        setToken(null);
        setUsername(null);
        setUid(null);

        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('uid');
    }

    const isTokenSet = async () => {
        try{
            let token = localStorage.getItem('token');

            if(token){
                setToken(token);
            }
        }
        catch(e){
            console.log('error setting token');
        }
    }

    const isEmailSet = async () => {
        try{
            let email = localStorage.getItem('email');

            if(email){
                setEmail(email);
            }
        }
        catch(e){
            console.log('error setting email');
        }
    }

    const isUsernameSet = async () => {
        try{
            let username = localStorage.getItem('username');

            if(username){
                setUsername(username);
            }
        }
        catch(e){
            console.log('error setting username');
        }
    }

    const isUidSet = async () => {
        try{
            let uid = localStorage.getItem('uid');

            if(uid){
                setUid(uid);
            }
        }
        catch(e){
            console.log('error setting uid');
        }
    }

    useEffect(()=>{
        isTokenSet();
        isUsernameSet();
        isUidSet();
        isUsernameSet();
    },[])

    return (
    <AuthContext.Provider value={{ token, uid, username, email, addEmail, addToken, addUsername, addUid, logout}}>
            { children }
        </AuthContext.Provider>
    )
}
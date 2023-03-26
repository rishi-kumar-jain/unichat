import React, {useContext,useState,useEffect } from "react";
import { useHistory  } from "react-router-dom";
import {auth} from "../firebase";

const AuthContext = React.createContext();
//React's context allows you to share information to any component, by 
//storing it in a central place and allowing access to any component that 
//requests it (usually you are only able to pass data from parent to child via props).


export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [loading , setLoading] = useState(true);
    const [user,setUser] = useState(null);
    const history = useHistory();

    useEffect(()=>{
        auth.onAuthStateChanged((user)=>{
            setUser(user);
            setLoading(false); 
            if(user) history.push('/chats');
        })
    },[user,history]);

    const value = {user};

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )

}
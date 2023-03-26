import React, {useRef, useState, useEffect} from "react";
import {useHistory} from 'react-router-dom';
import { ChatEngine } from "react-chat-engine";
import {auth} from '../firebase';
import { useAuth } from "../contexts/AuthContext";
import axios from 'axios';



const Chats = ()=>{
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    console.log(user);
    const handleLogout = async () => {
        await auth.signOut();
        history.push('/');
    }

    const getFile = async (url)=>{
        const response = await fetch(url);
        const data = await response.blob();//images or any files that u want to transfer in binary form
        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }

    useEffect(()=>{
        if(!user){
            history.push("/");
            return;
        }

        axios.get('https://api.chatengine.io/users/me', { //this is for already created user in  chatengine.
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": user.email,
                "user-secret": user.uid,
                
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(()=>{   // if user not created in chat engnie thn create one
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);  
             
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar)=>{
                    formdata.append('avatar', avatar, avatar.name);

                    axios.post('https://api.chatengine.io/users', 
                        formdata, 
                        {headers : {"private-key": process.env.REACT_APP_CHAT_ENGINE_KEY }}).then(()=>setLoading(false)).catch((error) => console.log("hi" + error ))
                
                
            }) 
    })
    
    }, [user, history]);    

    if(!user || loading ) return 'Loading...';
    
    return (
        <div className="chat-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Unichat
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine
                height="calc(100vh - 66px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={user.email}
                userSecret={user.uid}
            
            />
            
            
        </div>
    );
} 

export default Chats;
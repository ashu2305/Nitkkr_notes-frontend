import React, { useState, useContext, useEffect }  from 'react';

import { Redirect, Link } from 'react-router-dom';

import axios from 'axios';
import config from '../config.json';
import dayjs from 'dayjs';

import Store from '../store/store';

import Avatar from '../images/avatar.svg';
import LoginMobile from '../images/login-bg.svg';
import Wavebg from '../images/wave.png';

import './pages.css';
import './login.css';
import './profile.css'


const Login = () =>{
    const [user, setUser] = useState({

    });
    

    const [errors, setError] = useState(0); 
    //0 no error
    //1 is empty error
    //2 unauthorized(username exist but isVerified false)
    //3 username does not exist
    //4 Password does not match


    useEffect(() =>{
        const getUser = async () => {

            try{
                const res = await axios({
                url: `${config.BASE}/getUser`,
                method: "GET",
                headers: {
                    Authorization: `Bearer ${localStorage.FBIdToken}`
                }
                });
                if(res.data){
                    setUser(res.data);
                console.log(res.data);
                    console.log(user);
                } 
            }
            catch(error){
                console.log(error);
            }
        };
        getUser();

    }, []);
    
    console.log(user);
   
    return(
        <>
        {/* <div className="login-content"> */}

        <div className="pro">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous"></link>
        <main class="profile">
            <div class="profile-bg"></div>
            <div class="contain">
                <aside class="profile-image">
                <a class="camera" href="#"><i class="fas fa-camera"></i></a>
                </aside>
                <section class="profile-info">
                <h1 class="first-name">{user.username}</h1>
                
                <h2>ABOUT</h2>
                <div>
                <p>Hello {user.username}, how are you doing during quarantine ? Dear, user your <b>Email address </b> is <b>{user.email_id}</b> </p>
                <p>you are an eminent student of <b>College: {user.college} </b></p>
                <p>your specialization is in <b>{user.branch} </b> branch </p>
                <p>you are currently in <b>{user.semeter}th </b> semester at {user.college}. You are our consistent user since <b>25 June</b> </p>

                </div>

                </section>
            </div>
            <section class="statistics">
                <p><strong>{user.contribution}</strong> Contributions</p>
            </section>
            </main>
                

        </div>
            
            {/* </div> */}

        </>
    );
}

export default Login;
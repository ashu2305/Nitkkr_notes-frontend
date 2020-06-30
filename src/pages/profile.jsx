import React, { useState, useContext }  from 'react';

import { Redirect, Link } from 'react-router-dom';

import axios from 'axios';
import config from '../config.json';

import Store from '../store/store';

import Avatar from '../images/avatar.svg';
import LoginMobile from '../images/login-bg.svg';
import Wavebg from '../images/wave.png';

import './pages.css';
import './login.css';
import './profile.css'


const Login = () =>{
    const [User, setUser] = useState([]);
    

    const [errors, setError] = useState(0); 
    //0 no error
    //1 is empty error
    //2 unauthorized(username exist but isVerified false)
    //3 username does not exist
    //4 Password does not match
    const getUser = async () => {

        try{
            const res = await axios({
            url: `${config.BASE}/getUser`,
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorage.FBIdToken}`
            }
            });
            setUser([...res.data]);
            console.log(res.data);
        }
        catch(error){
            console.log(error);
        }
    };
    getUser();
   
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
                <h1 class="first-name">Rakshak</h1>
                <h1 class="second-name">Aggarwal</h1>
                <h2>ABOUT</h2>
                <p>
                    hello hello, I'm Rakshak, artist and developer 🌼 student at stanford; intern at zynga 🌱 happy to be here! 🌿 let's code the best we can!
                </p>

                </section>
            </div>
            <section class="statistics">
                <p><strong>6</strong> Contributions</p>
            </section>
            </main>
                

        </div>
            
            {/* </div> */}

        </>
    );
}

export default Login;
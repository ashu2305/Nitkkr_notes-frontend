import React, { useState, useContext }  from 'react';

import { Redirect, Link } from 'react-router-dom';

import axios from 'axios';
import config from '../config.json';

import Store from '../store/store';

import './login.css';

import ChangeMobile from '../images/change-bg.svg';
import Wavebg from '../images/wave.png';

import './pages.css';

const ChangePassword = () => {
    const{ state, dispatch } = useContext(Store);
    const [data, setData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    });
    
    const [errors, setError] = useState(0); 
    
    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const verify = async() => {
        try{
            const res = await axios.post(
                `${config.BASE}/changePassword` , 
                data
            );
            //console.log(res);
            if(res.data) {
                //console.log(res.data);
                localStorage.setItem('FBIdToken', `${res.data.token}`);
                dispatch({
                    type: 'ONBOARD',
                    payload: res.data.token
                });
            }            
        }
        catch(error) {
            console.log(error);
        }   
    }

    const onSubmit = e => {
        e.preventDefault();
        if(data.password === data.confirmPassword) {
            if(data.username !== '' && data.password !== '') {
                setError(0);
                verify();
                //samp();
            }
            else {
                setError(1);
            }
        }
        else {
            setError(4);
        }
        
        //console.log("hello in submit");
    }
    //console.log(state.isAuth); 

    if(state.isAuth) {
        return <Redirect to='/' />;
    }

    return (
        <>
            <img className="wave" src={Wavebg}></img>
            <div className="container_login">
                <div className="img">
                    <img src={ChangeMobile}></img>
                </div>
            </div>
        </>
    );
}

export default ChangePassword;
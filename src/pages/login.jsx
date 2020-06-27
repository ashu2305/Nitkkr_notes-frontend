import React, { useState, useContext }  from 'react';

import { Redirect, Link } from 'react-router-dom';

import axios from 'axios';
import config from '../config.json';

import Store from '../store/store';

import './login.css';

import Avatar from '../images/avatar.svg';
import LoginMobile from '../images/login-bg.svg';
import Wavebg from '../images/wave.png';

import './pages.css';
const Login = () =>{
    const{ state, dispatch } = useContext(Store);
    const [data, setData] = useState({
        username: '',
        password: ''
    });
    
    const [errors, setError] = useState(0); 

    
    const handleChange = e =>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const verify = async() => {
        try{
            const res = await axios.post(
                `${config.BASE}/auth/login/` , 
                data
            );
            console.log(res);
            if(res.data)
            {
                console.log(res.data);
                localStorage.setItem('FBIdToken', `${res.data.token}`);
                dispatch({
                    type: 'ONBOARD',
                    payload: res.data.token
                });
            }            
        }catch(error){
            if(error.response.data.non_field_errors[0] === 'wrong'){
                setError(2);
            }

            
            console.log(error.response.data.non_field_errors);
        }   
    }
   


    const onSubmit = e =>{
        e.preventDefault();
        if(data.username !== '' && data.password !== ''){
            setError(0);
            verify();
            //samp();
        }else{
            setError(1);
        }
        
        console.log("hello in submit");
    }

    //console.log(state.isAuth); 

    if(state.isAuth){
        return <Redirect to='/' />;
    }
    return(
        <>
            <img className="wave" src={Wavebg}></img>
            <div className="container_login">
                <div className="img">
                    <img src={LoginMobile}></img>
                </div>
                <div className="login-content">
                    <form >
                        <img src={Avatar}></img>
                        <h2 className="title">Welcome</h2>
                        <div className="input-div one focus">
                            <div className="i">
                                    <i className="fas fa-user"></i>
                            </div>
                            <div className="div">
                                    <h4>Username</h4>
                                    <input 
                                        type="text" 
                                        name='username'
                                        onChange={handleChange}
                                        required='required'
                                        className="input" 
                                    />
                            </div>
                        </div>
                        <div className="input-div pass focus">
                            <div className="i"> 
                                    <i className="fas fa-lock"></i>
                            </div>
                            <div className="div">
                                    <h4>Password</h4>
                                    <input 
                                        type="password"  
                                        name='password'
                                        onChange={handleChange}
                                        required='required'
                                        className="input" 
                                    />
                            </div>
                        </div>
                        {/* <a href="#">Forgot Password?</a> */}
                        <input type="submit" className="btn_login" onClick={onSubmit} value="Login" />

                        <br></br>
                        <p>If you do not have account, please Click<Link to = '/signup'>  here</Link></p>
                        {/* {samp} */}
                        {errors=== 1 && 
                            <p>Please fill all credentials</p>
                        }
                        {errors === 2 &&
                            <p>Wrong Credentials</p>
                        }
                    </form>
                    
                </div>
            </div>

        </>
    );
}

export default Login;
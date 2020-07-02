import React, { useState, useContext }  from 'react';

import { Redirect, Link } from 'react-router-dom';

import axios from 'axios';
import config from '../config.json';

import Store from '../store/store';

import Avatar from '../images/avatar.svg';
import LoginMobile from '../images/signin-bg.svg';
import Wavebg from '../images/wave.png';

import './pages.css';
import './login.css';

const Login = () =>{
    const{ state, dispatch } = useContext(Store);
    const [data, setData] = useState({
        username: '',
        password: ''
    });
    const[load, setLoad] = useState(false);
    
    const [errors, setError] = useState(0); 
    //0 no error
    //1 is empty error
    //2 unauthorized(username exist but isVerified false)
    //3 username does not exist
    //4 Password does not match
    
    const handleChange = e =>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const verify = async() => {
        try{
            const res = await axios.post(
                `${config.BASE}/login` , 
                data
            );
           // console.log(res);
            if(res.data)
            {
                //console.log(res.data);
                localStorage.setItem('FBIdToken', `${res.data.token}`);
                dispatch({
                    type: 'ONBOARD',
                    payload: res.data.token
                });
                
                
            }            
        }catch(error){
            if(error.response.data.error === "unauthorized"){
                setError(2);
            }
            else if(error.response.data.error === "username does not exist"){
                setError(3);
            }
            else if(error.response.data.error === "Password does not match"){
                setError(4);
            }
            else{
                window.alert("Please try again");
            }
            setLoad(false);
            //console.log(error.response);
        }   
    }
    if(errors === 2){
        window.alert("Please verify your email first");
        return <Redirect to='/signup' />;
    }
    const onSubmit = e =>{
        e.preventDefault();
        if(data.username !== '' && data.password !== ''){
            setError(0);
            setLoad(true);
            verify();
        }else{
            setError(1);
        }
        //console.log("hello in submit");
    }

    //console.log(state.isAuth); 

    if(state.isAuth){
        //setLoad(false);
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
                        <Link to = '/forgotPass' >Forgot Password?</Link>
                        {load ?
                            <input  type= "button" className="btn_login"  value="Loading" />
                            : 
                            <input type="submit" className="btn_login" onClick={onSubmit} value="Login" />

                        }
                        

                        <br></br>
                        <p>If you do not have account, please Click<Link to = '/signup'>  here</Link></p>
                        <br></br>
                        {errors=== 1 && 
                            <p>Please fill all credentials</p>
                        }
                        {errors === 3 &&
                            <p>Username does not exist</p>
                        }
                        {errors === 4 &&
                            <p>Wrong Password</p>
                        }
                    </form>
                    
                </div>
            </div>

        </>
    );
}

export default Login;
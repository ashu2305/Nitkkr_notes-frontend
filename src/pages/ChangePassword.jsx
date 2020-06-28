import React, { useState, useContext }  from 'react';

import { Redirect, Link } from 'react-router-dom';

import axios from 'axios';
import config from '../config.json';

import Store from '../store/store';

import './login.css';

import Avatar from '../images/avatar.svg';
import ChangeMobile from '../images/change-bg.svg';
import Wavebg from '../images/wave.png';

import './pages.css';
const ChangePassword = () =>{
    const{ state, dispatch } = useContext(Store);
    const [data, setData] = useState({
        username: '',
        password: '',
        confirmPassword: ''
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
                `${config.BASE}/changePassword` , 
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
            // if(error.response.data.non_field_errors[0] === 'wrong'){
            //     setError(2);
            // }

            
            console.log(error);
        }   
    }
   


    const onSubmit = e =>{
        e.preventDefault();
        if(data.password === data.confirmPassword){
            if(data.username !== '' && data.password !== ''){
                setError(0);
                verify();
                //samp();
            }else{
                setError(1);
            }
        }else{
            setError(4);
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
                    <img src={ChangeMobile}></img>
                </div>
                <div className="login-content">
                    <form >
                        <img src={Avatar}></img>
                        <h3 className="title">Change Password</h3>
                        <br></br>
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
                        <div className="input-div pass focus">
                            <div className="i"> 
                                    <i className="fas fa-lock"></i>
                            </div>
                            <div className="div">
                                    <h4>Confirm Password</h4>
                                    <input 
                                        type="password"  
                                        name='confirmPassword'
                                        onChange={handleChange}
                                        required='required'
                                        className="input" 
                                    />
                            </div>
                        </div>
                        {/* <a href="#">Forgot Password?</a> */}
                        <input type="submit" className="btn_login" onClick={onSubmit} value="Change" />

                        <br></br>
                        <p><b>Password must contain: </b><br></br>At least 1 upper case letter (A - Z)<br></br>At least 1 number (0 - 9)
                        <br></br>At least 8 characters</p>
                        {/* {samp} */}
                        {errors=== 1 && 
                            <p>Please fill all credentials</p>
                        }
                        {errors === 2 &&
                            <p>Wrong Credentials</p>
                        }
                        {errors === 4 &&
                            <p  className="error">Password doesnot match with Confirm Password</p>
                        }
                    </form>
                    
                </div>
            </div>

        </>
    );
}

export default ChangePassword;
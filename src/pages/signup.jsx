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

const Signup = () => {
    const{ state } = useContext(Store);
    const [data, setData] = useState({
        emailId: '',
        password: '',
        confirmPassword: '', 
        username: ''
    });

    const [load, setLoad] = useState(false);
    const [firstVerify, setFirst] = useState(false);

    const [userOTP, setUserOTP] = useState('');

    const [backOTP, setBackOTP] = useState('');

    const [verified, setVerified] = useState(false);

    const [errors, setError] = useState(0); 
    // 0 no error
    //1 is empty error
    // 2 valid email error
    //3 pass and confirm pass does not match
    //4 username exist but not verified(either choose any other username or verify email)
    //5 username exist and verified(please login as this username exist )
    //6 email already exist
    //7 smtp error
    //error of to verify email
    //8 username doesnot exist
    //9 already verified

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const otpChange = e => {
        setUserOTP(e.target.value);
    }

    const verify = async() => {
        const userData = {
            username: data.username,
            password: data.password,
            emailId: data.emailId
        }

        try {
            const res = await axios({
                url: `${config.BASE}/signup`,
                method: "POST",
                data : userData
            });
            
            if(res.data)
            {
                //console.log(res.data.otp);
                setBackOTP(res.data.otp);
                setFirst(true);
                setLoad(false);
            }            
        }
        catch(error) {
            if(error.response.data.error === "username already exist but verification required") {
                setError(4);
                window.alert("Either choose any other username or verify email as this username already exist");
            }
            else if(error.response.data.error === "username already exist") {
                setError(5);
                window.alert("Please login as this username exist");
            }
            else if(error.response.data.error === "email already exist") {
                setError(6);
            } 
            else if(error.response.data.error === "smtp error") {
                setError(7);
            }
            else {
                window.alert("please try again");
            }

            setLoad(false);
            console.log(error);
        }   
    }

    const onSubmit = e => {
        e.preventDefault();
        if(data.password === data.confirmPassword) {
            if(data.emailId !== '' && data.password !== '' && data.confirmPassword !== '' && data.username !== '' ) {
                if(isEmail(data.emailId)) {
                    setLoad(true);
                    verify(); 
                }
                else {
                    setError(2)
                }
            }
            else {
                setError(1);
            }
        }
        else {
            setError(3);
        }

        //console.log("hello in submit");
    }
    
    const isEmail = (email) => {
        const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email.match(regEx)) 
            return true;
        else 
            return false;
      };
    
    const verifyOTP = async() => {
        const userData = {
            username: data.username,
            otp: userOTP
        }

        try {
            const res = await axios({
                url: `${config.BASE}/otpVerify`,
                method: "POST",
                data: userData
            })

            if(res.data.status === "otp verified") {
                //console.log(res.data.status);
                setVerified(true);
            }
        }
        catch(error) {
            setFirst(false);
            setLoad(false);
            console.log(error);
        }
    }

    if(verified) {
        return <Redirect to='/login' />;
    }

    const submitOTP = (e) => {
        e.preventDefault();
        
        if(backOTP === userOTP) {
            setLoad(true);
            verifyOTP();
        }
        else {
            window.alert("OTP does not match");
        }
    }

    const resendVerify = async() => {
        const userData = {
            username: data.username,
            password: data.password,
        }

        try {
            const res = await axios({
                url: `${config.BASE}/resendOtp`,
                method: "POST",
                data: userData
            });
            
            if(res.data) {
                //console.log(res.data.otp);
                setBackOTP(res.data.otp);
                setFirst(true);
                setLoad(false);
            }            
        }
        catch(error) {
            if(error.response.data.error === "unauthorized") {
                setError(8);
            }
            else if(error.response.data.error === "already verified !") {
                window.alert("this user is already verified , please login");
                setVerified(true);
            } 
            else {
                window.alert("please try again");
            }

            setLoad(false);
            console.log(error);
        }   
    }

    const resendOTP= (e) => {
        e.preventDefault();
        setLoad(true);
        resendVerify();
    }

    //console.log(firstVerify);
    //console.log(data);

    if(state.isAuth){
        return <Redirect to='/login' />;
    }

    return (
        <>
            <img className="wave" alt="background" src={Wavebg}></img>
            <div className="container_login">
                <div className="img">
                    <img src={LoginMobile} alt="side"></img>
                </div>
                {!firstVerify ? (
                    <div className="login-content">
                        <form>
                            <img src={Avatar} alt="avatar img"></img>
                            <h2 className="title">Welcome</h2>
                            <div className="input-div one focus">
                                <div className="i">
                                        <i className="fas fa-envelope"></i>
                                </div>
                                <div className="div">
                                        <h4>Email Address</h4>
                                        <input 
                                            type="email" 
                                            name='emailId'
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
                            <div className="input-div pass focus">
                                <div className="i"> 
                                        <i className="fas fa-user"></i>
                                </div>
                                <div className="div">
                                        <h4>User Name</h4>
                                        <input 
                                            type="text"  
                                            name='username'
                                            onChange={handleChange}
                                            required='required'
                                            className="input" 
                                        />
                                </div>
                            </div>
                            {load ? 
                                <input type="button" className="btn_login"  value="Loading" />
                                :
                                <input type="submit" className="btn_login" onClick={onSubmit} value="Signup" />

                            }
                            
                            
                            {/* <input type="submit" className="btn_login" onClick={onSubmit} value="Signup" /> */}
                            <br></br>
                            <p>If you have an existing account, please Click<Link to = '/login'>  here</Link></p>
                            <br></br>
                            {errors=== 1 &&  <><p className="error">Please fill all credentials</p><br></br></> }
                            {errors=== 2 &&  <><p className="error">Please enter valid email</p><br></br></> }
                            {errors=== 3 &&  <><p className="error">Password and Confirm Password doesnot match</p><br></br></> }
                            {errors=== 6 &&  <><p className="error"> Email already exist</p><br></br></> }
                            
                            <h4 className="title">To Verify email</h4>
                            <br></br>
                            <div className="input-div pass focus">
                                <div className="i"> 
                                        <i className="fas fa-user"></i>
                                </div>
                                <div className="div">
                                        <h4>User Name</h4>
                                        <input 
                                            type="text"  
                                            name='username'
                                            onChange={handleChange}
                                            required='required'
                                            className="input" 
                                        />
                                </div>
                            </div>
                            {load ? 
                                <input type="button" className="btn_login" value="Loading" />
                                :
                                <input type="submit" className="btn_login"  onClick = {resendOTP} value="Verify Email" />
                           
                            }
                            {/* <input type="submit" className="btn_login"  onClick = {resendOTP} value="Verify Email" /> */}
                            <br></br>
                            {errors=== 8 &&  <><p className="error">Username does not exist , Please Signup first</p><br></br></> }
                        </form>
                        
                    </div>
                ):(
                    <div className="login-content">
                        <form>
                            <img src={Avatar} alt="avatar img"></img>
                            <h2 className="title">Verify</h2>
                            <div className="input-div one focus">
                                <div className="i">
                                        <i className="fas fa-envelope"></i>
                                </div>
                                <div className="div">
                                        <h4>Enter Verification Code</h4>
                                        <input 
                                            type = "text"
                                            onChange = {otpChange}
                                            required='required'
                                            className="input"
                                            value = {userOTP}
                                        />
                                </div>
                            </div>
                            <input type="submit" className="btn_login" onClick={submitOTP} value="Confirm" />
                            <br></br>
                            <input type="submit" className="btn_login" onClick={resendOTP} value="Resend" />
                            <br></br>
                            <p>We have sent a Verification code to your registered email Id.</p>
                        </form>
                        
                    </div>
                )}
            </div>

        </>
    );
}

export default Signup;
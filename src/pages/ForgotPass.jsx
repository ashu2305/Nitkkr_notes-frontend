import React, { useState, useContext }  from 'react';

import { Redirect, Link } from 'react-router-dom';

import axios from 'axios';
import config from '../config.json';

import Store from '../store/store';

import './login.css';

import Avatar from '../images/avatar.svg';
import ForgotMobile from '../images/forgot-bg.svg';
import OtpMobile from '../images/otp-bg.svg';
import Wavebg from '../images/wave.png';

import './pages.css';
import ChangePassword from './ChangePassword';

const ForgotPass = () => {
    const{ state, dispatch } = useContext(Store);

    const [data, setData] = useState({ 
        username: ''
    });

    const [sata, setSata] = useState({ 
        password: '',
        confirmPassword: ""
    });

    const [firstVerify, setFirst] = useState(false);

    const [secondVerify, setSecond] = useState(false);

    const [userOTP, setUserOTP] = useState('');

    const [backOTP, setBackOTP] = useState('');

    const [verified, setVerified] = useState(false);

    const [errors, setError] = useState(0); 
    // 0 no error
    //error for forgotpass page
    //1 is empty error
    //2 username does not exist
    // change password error
    // 6 is empty error
    //7 pass does not match

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const otpChange = e => {
        setUserOTP(e.target.value);
    }

    const handleChangePassword = e => {
        setSata ({
            ...sata,
            [e.target.name]: e.target.value
        })
    }

    const verify = async() => {
        const userData = {
            username: data.username
        }

        try {    
            const res = await axios({
                url: `${config.BASE}/forgotPassword`,
                method: "POST",
                data : userData
            });
            
            if(res.data) {
                console.log(res.data.otp);
                setBackOTP(res.data.otp);
                setFirst(true);
            }            
        }
        catch(error) {
            if(error.response.data.error === "username does not exist") {
                setError(2);
            }
            else if(error.response.data.error === "username does not verified") {
                setError(3);
            }
            else {
                window.alert("Please try again");
            }
            console.log(error);
        }   
    }

    const onSubmit = e => {
        e.preventDefault();
        if(data.username !== '' ) {
            if(!firstVerify) {
                verify();
            }
        }
        else {
            setError(1);
        }

        //console.log("hello in submit");
    }

    const resendVerify = async() => {
        const userData = {
            username: data.username
        }

        try {            
            const res = await axios({
                url: `${config.BASE}/resendOtp`,
                method: "POST",
                data: userData
            });
            
            if(res.data){
                console.log(res.data.otp);
                setBackOTP(res.data.otp);
                setFirst(true);
                // localStorage.setItem('FBIdToken', `${res.data.token}`);
                // dispatch({
                //     type: 'ONBOARD',
                //     payload: res.data.token
                // });
            }            
        }
        catch(error) {
            console.log(error);
        }   
    }

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
                console.log(res.data.status);
                setSecond(true);
            }

        }
        catch(error) {
            setFirst(false);
            console.log(error);
        }
    }
    //console.log(userOTP);

    const resendOTP= (e) => {
        e.preventDefault();
        resendVerify();
    }
    
    const submitOTP = (e) => {
        e.preventDefault();
        if(backOTP === userOTP) {
            verifyOTP();
        }
        else {
            window.alert("OTP does not match");
        }
    }

    const passwordChange = async() => {
        const userData = {
            username: data.username,
            password: sata.password
        }

        try {
            const res = await axios({
                url: `${config.BASE}/changePassword`,
                method: "POST",
                data: userData
            })

            if(res.data.pass === "password successfully changed") {
                console.log(res.data.status);
                window.alert("Password Succesfully changed");
                setVerified(true);
            }
        }
        catch(error) {
            setFirst(false);
            setSecond(false);
            console.log(error.response);
        }
    }

    const changePassword = (e) => {
        e.preventDefault();
        if(sata.password === sata.confirmPassword) {
            if(sata.password !== '' && sata.confirmPassword !== '') {
                setError(0);
                passwordChange();
            }
            else {
                setError(6);
            }
        }
        else {
            setError(7);
        }
    }

    if(verified) {
        return <Redirect to='/login' />;
    }

    if(state.isAuth) {
        return <Redirect to='/login' />;
    }

    return (
        <>
            <img className="wave" alt="background" src={Wavebg}></img>
            <div className="container_login">
                <div className="img">
                    <img src={ForgotMobile} alt="side"></img>
                </div>
                { !firstVerify && !secondVerify  &&
                    <div className="login-content">
                        <form>
                            <img src={Avatar} alt="avatar img"></img>
                            <h3 className="title">Forgot Password</h3>
                            <br></br><br></br>
                            
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
                            <br></br>
                                                    
                            <input type="submit" className="btn_login" onClick={onSubmit} value="Send OTP" />
                            <br></br>
                            <p>If you do not have account, please Click<Link to = '/signup'>  here</Link></p>
                            {errors=== 1 && 
                                <p className="error">Please fill all credentials</p>
                            }
                            {errors === 2 &&
                                <p className="error">Username does not exist</p>
                            }
                            {errors === 3 &&
                                <p className="error">Email with this username doesnot verify, Verify first</p>
                            }
                        </form>
                        
                    </div>
                }
                { firstVerify && !secondVerify &&
                    <div className="login-content">
                        <form>
                            <img src={Avatar} alt="avatar img"></img>
                            <h2 className="title">Verify</h2>
                            <br></br>
                            <div className="input-div one focus">
                                <div className="i">
                                        <i className="fas fa-envelope"></i>
                                </div>
                                <div className="div">
                                        <h4>Enter Verification Code</h4>
                                        <input 
                                            type = "text"
                                            name='otp'
                                            onChange = {otpChange}
                                            required='required'
                                            className="input" 
                                        />
                                </div>
                            </div>
                            <input type="submit" className="btn_login" onClick={submitOTP} value="Confirm" />
                            <br></br>
                            <input type="submit" className="btn_login" onClick={resendOTP} value="Resend" />
                            <br></br>
                            <p>We have sent a Verification code to your registered email Id.</p>
                            {errors=== 1 && 
                                <p className="error">Please enter otp</p>
                            }
                            {errors === 2 &&
                                <p className="error">Wrong otp</p>
                            }
                        </form>
                        
                    </div>

                }
                {firstVerify && secondVerify &&
                    <div className="login-content">
                        <form >
                            <img src={Avatar}></img>
                            <h3 className="title">Change Password</h3>
                            <br></br>
                            <div className="input-div pass focus">
                                <div className="i"> 
                                        <i className="fas fa-lock"></i>
                                </div>
                                <div className="div">
                                        <h4>Password</h4>
                                        <input 
                                            type="password"  
                                            name='password'
                                            onChange={handleChangePassword}
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
                                        onChange={handleChangePassword}
                                        required='required'
                                        className="input" 
                                    />
                                </div>
                            </div>
                            {/* <a href="#">Forgot Password?</a> */}
                            <input type="submit" className="btn_login" onClick={changePassword} value="Change" />
    
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
                                <p  className="error">Password does not match with Confirm Password</p>
                            }
                        </form>
                        
                    </div>

                }
            </div>

        </>
    );
}

export default ForgotPass;
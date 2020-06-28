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

const ForgotPass = () => {
    const{ state, dispatch } = useContext(Store);
    const [data, setData] = useState({ 
        username: ''
    });
    const [firstVerify, setFirst] = useState(false);

    const [userOTP, setUserOTP] = useState('');

    const [backOTP, setBackOTP] = useState('');

    const [verified, setVerified] = useState(false);

    const [errors, setError] = useState(0); 

    const handleChange = e =>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };
    const otpChange = e =>{
        setUserOTP(e.target.value);
    }

    

    


    const verify = async() => {
        const userData = {
            username: data.username
        }
        try{
            
            const res = await axios({
                url: `${config.BASE}/forgotPassword`,
                method: "POST",
                data : userData
            });
            
            if(res.data)
            {
                console.log(res.data.otp);
                //localStorage.setItem('FBIdToken', `${res.data.token}`);
                setBackOTP(res.data.otp);
                setFirst(true);
            }            
        }catch(error){
            // try{
            //     const res = await axios({
            //         url: `${config.BASE}/getuser/`,
            //         method: "POST",
            //         data: formData
            //     });
            //     console.log(res);
            //     if(res.data.user.verified === "yes" ){
            //         window.alert("You have already an account, Please Login not SignUp ");
            //         setVerified(true);
            //     }else{
            //         setFirst(true);
            //         setBackOTP(res.data.user.otp);
            //     }
                
            // }catch(err){
            //     console.log(err);   
            // }
            console.log(error);
        }   
    }

    const resendVerify = async() => {
        const userData = {
            username: data.username
        }
        try{
            
            const res = await axios({
                url: `${config.BASE}/resendOtp`,
                method: "POST",
                data: userData
            });
            
            if(res.data)
            {
                console.log(res.data.otp);
                setBackOTP(res.data.otp);
                setFirst(true);
                // localStorage.setItem('FBIdToken', `${res.data.token}`);
                // dispatch({
                //     type: 'ONBOARD',
                //     payload: res.data.token
                // });
            }            
        }catch(error){
            console.log(error);
        }   
    }

    

    const verifyOTP = async() => {
        const userData = {
            username: data.username,
            otp: userOTP
        }
        try{
            const res = await axios({
                url: `${config.BASE}/otpVerify`,
                method: "POST",
                data: userData
            })
            if(res.data.status === "otp verified"){
                console.log(res.data.status);
                setVerified(true);
            }

        }catch(error){
            setFirst(false);
            console.log(error);
        }
    }
    //console.log(userOTP);

    if(verified){
        return <Redirect to='/ChangePassword' />;
    }


    const resendOTP= (e) => {
        e.preventDefault();
        resendVerify();
    }
    console.log(firstVerify);
    console.log(data);

    const onSubmit = e =>{

        e.preventDefault();
        if(data.username !== '' ){
            if(!firstVerify){
                verify();
            }else{
                resendVerify();
            } 
    
            //console.log('asdf');
        }else{
            setError(1);
        }
        
        console.log("hello in submit");
    }
    
    const submitOTP = (e) => {
        e.preventDefault();
        if(backOTP === userOTP)
        {
            verifyOTP();
        }else{
            window.alert("OTP does not match");
        }
    }

    if(state.isAuth){
        return <Redirect to='/login' />;
    }
    return(
        

        <>
            {!firstVerify ? ( 
                <>
                    <img className="wave" alt="background" src={Wavebg}></img>
                    <div className="container_login">
                        <div className="img">
                            <img src={ForgotMobile} alt="side"></img>
                        </div>
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
                                {/* {samp} */}
                                {errors=== 1 && 
                                    <p className="error">Please fill all credentials</p>
                                }
                                {errors === 2 &&
                                    <p className="error">Wrong Credentials</p>
                                }
                            </form>
                            
                        </div>
                    </div>
        
                </>
                
            ): (

                <>
                    <img className="wave" alt="background" src={Wavebg}></img>
                    <div className="container_login">
                        <div className="img">
                            <img src={OtpMobile} alt="side"></img>
                        </div>
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
                                {/* {samp} */}
                                {errors=== 1 && 
                                    <p className="error">Please enter otp</p>
                                }
                                {errors === 2 &&
                                    <p className="error">Wrong otp</p>
                                }
                            </form>
                            
                        </div>
                    </div>
        
                </>

            )}
            
        </>
    );
}

export default ForgotPass;
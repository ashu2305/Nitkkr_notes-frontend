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
    const{ state, dispatch } = useContext(Store);
    const [data, setData] = useState({
        emailId: '',
        password: '',
        confirmPassword: '', 
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
            username: data.username,
            password: data.password,
            emailId: data.emailId
        }
        try{
            
            const res = await axios({
                url: `${config.BASE}/signup/`,
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
            username: data.username,
            password: data.password,
            emailId: data.emailId
        }
        try{
            
            const res = await axios({
                url: `${config.BASE}/resend/`,
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
            password: data.password,
            emailId: data.emailId,
            otp: userOTP
        }
        try{
            const res = await axios({
                url: `${config.BASE}/verifyOtp/`,
                method: "POST",
                data: userData
            })
            if(res.data.status === "correct otp"){
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
        return <Redirect to='/login' />;
    }


    const resendOTP= (e) => {
        e.preventDefault();
        resendVerify();
    }
    console.log(firstVerify);
    console.log(data);

    const onSubmit = e =>{

        e.preventDefault();
        if(data.password === data.confirmPassword){
            if(data.id !== '' && data.password !== '' && data.confirmPassword !== '' && data.name !== '' ){
                if(!firstVerify){
                    verify();
                }else{
                    resendVerify();
                } 
        
                //console.log('asdf');
            }else{
                setError(1);
            }
        }else{
            setError(4);
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
                            <img src={LoginMobile} alt="side"></img>
                        </div>
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
                                                name='id'
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
                                                name='name'
                                                onChange={handleChange}
                                                required='required'
                                                className="input" 
                                            />
                                    </div>
                                </div>
                                
                                
                               
                                <input type="submit" className="btn_login" onClick={onSubmit} value="Signup" />
                                <br></br>
                                <p>If you do not have account, please Click<Link to = '/login'>  here</Link></p>
                                {/* {samp} */}
                                {errors=== 1 && 
                                    <p className="error">Please fill all credentials</p>
                                }
                                {errors === 2 &&
                                    <p className="error">Wrong Credentials</p>
                                }
                                {errors === 4 &&
                                    <p  className="error">Password doesnot match with Confirm Password</p>
                                }
                            </form>
                            
                        </div>
                    </div>
        
                </>
                
            ): (
                <div>
                    this is otp check
                    <br></br>
                    <input 
                        type = "text"
                        onChange = {otpChange}
                    />
                    <br></br>
                    <button onClick={submitOTP}>Confirm</button>
                    <br></br>
                    <button onClick={resendOTP}>Resend</button>
                </div>
            )}
            
        </>
    );
}

export default Signup;
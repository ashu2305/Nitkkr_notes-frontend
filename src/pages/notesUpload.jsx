
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

const Login = () =>{
    const{ state, dispatch } = useContext(Store);
    const [data, setData] = useState({
        title: '',
        author: '',
        sem: '',
        teacher: '',
        subject: '', 
        noteFile: ''
    });
    console.log(data);
    

    const [errors, setError] = useState(0); 
    //0 no error
    //1 is empty error
    //2 unauthorized(username exist but isVerified false)
    //3 username does not exist
    //4 Password does not match

    const subjectName = [
        {name: 'Sot Computing'},
        {name: 'Operating System'},
        {name: 'S V V'},
        {name: 'Database Management'},
        {name: 'Communication System'},
        {name: 'C++'},
        {name: 'Java'},
    ]
    
    const handleChange = e =>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };
    
    const fileChange = e =>{
        let filex = e.target.files[0]
        setData({
            ...data,
            noteFile : filex
        });
    };

    const verify = async() => {
        const formData = new FormData();
        formData.append('author', data.author);
        formData.append('sem', data.sem);
        formData.append('teacher', data.teacher);
        formData.append('title', data.title);
        formData.append('noteFile', data.noteFile);
        formData.append('subject', data.subject);
        try{
            const res = await axios({
                url: `${config.BASE}/noteUpload`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.FBIdToken}`
                },
                data: formData
            });
           // console.log(res);
            if(res.data)
            {
                console.log(res.data);
                setData({
                    title: '',
                    author: '',
                    sem: '',
                    teacher: '',
                    subject: '', 
                    noteFile: ''
                })
            }            
        }catch(error){
            
            
            console.log(error.response);
        }   
    }
    const onSubmit = e =>{
        e.preventDefault();
        if(data.title !== '' && data.author !== '' && data.teacher !== '' && data.noteFile !== '' && data.sem !== '' && data.subject !== ''){
            setError(0);
            verify();
        }else{
            setError(1);
            console.log("error in submit")
        }
        //console.log("hello in submit");
    }

   
    return(
        <>
            <div className="login-content">
                <form >
                    <img src={Avatar}></img>
                    <h2 className="title">Upload</h2>
                    <div className="input-div one focus">
                        <div className="i">
                                <i className="fas fa-user"></i>
                        </div>
                        <div className="div">
                                <h4>Note Title</h4>
                                <input 
                                    type="text" 
                                    name='title'
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
                                <h4>Author</h4>
                                <input 
                                    type="text"  
                                    name='author'
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
                                <h4>Semester</h4>
                                <input 
                                    type="number"  
                                    name='sem'
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
                                <h4>Teacher Name</h4>
                                <input 
                                    type="text"  
                                    name='teacher'
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
                                <h4>Subject</h4>
                                <select name="subject" onChange={handleChange}>
                                    {subjectName && subjectName.map((m,i) =>(
                                        <option key={i}>{m.name}</option>
                                    ))}
                                    <option></option>
                                </select>
                        </div>
                    </div>
                    <div className="input-div pass focus">
                        <div className="i"> 
                                <i className="fas fa-user"></i>
                        </div>
                        <div className="div">
                                <h4>Image</h4>
                                <input 
                                    name= 'image'
                                    type ="file"
                                    onChange ={fileChange}
                                    className='input'
                                />
                        </div>
                    </div>
                    <input type="submit" className="btn_login" onClick={onSubmit}  value="Upload" />

                    
                </form> 
                
            </div>

        </>
    );
}

export default Login;



















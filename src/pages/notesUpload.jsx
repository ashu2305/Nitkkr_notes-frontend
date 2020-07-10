import React, { useState, useContext, useEffect }  from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import config from '../config.json';
import Aos from 'aos';
import 'aos/dist/aos.css';

import Store from '../store/store';

import Avatar from '../images/noteupload.svg';

import './pages.css';
import './login.css';
import './notesUpload.css'

const NotesUpload = () => {
    const{ state} = useContext(Store);
    const [data, setData] = useState({
        title: '',
        author: '',
        sem: '',
        teacher: '',
        subject: '', 
        noteFile: ''
    });
    //console.log(data);
    
    const [load, setLoad] = useState(false);
    const [errors, setError] = useState(0); 
    //0 no error
    //1 is empty error
    

    useEffect(() => {
        Aos.init({ duration: 2000 });
    },[]);
    
    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };
    
    const fileChange = e => {
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

        try {
            const res = await axios({
                url: `${config.BASE}/noteUpload`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.FBIdToken}`
                },
                data: formData
            });
           // console.log(res);
            if(res.data) {
                //console.log(res.data);
                setData({
                    title: '',
                    author: '',
                    sem: '',
                    teacher: '',
                    subject: '', 
                    noteFile: ''
                })
                setLoad(false);
                window.alert("Notes uploaded successfully");
            }            
        }
        catch(error) {
            setLoad(false);
            if(error.response.data.erors === "note not uploaded"){
                window.alert("Note not upload");
            }
            //console.log(error.response);
        }   
    }

    const onSubmit = e => {
        e.preventDefault();
        if(data.title !== '' && data.author !== '' && data.teacher !== '' && data.noteFile !== '' && data.sem !== '' && data.subject !== '') {
            setError(0);
            setLoad(true);
            verify();
        }
        else {
            setError(1);
            //console.log("error in submit")
        }
        //console.log("hello in submit");
    }

   
    return (
        <>
            <div data-aos="fade-up" className="login-content">
                <form className="upload">
                    <img src={Avatar} alt="avatar"></img>
                    <div class="segment">
                        <h1>Upload</h1>
                    </div>

                    <div className="set">  
                        <label className="lab">
                            <input 
                                type="text" 
                                name='title'
                                value = {data.title}
                                onChange={handleChange}
                                required='required'
                                className="inp" 
                                placeholder="Note Title"
                            />
                        </label>
                        <label className="lab">
                            <input 
                                type="text"  
                                name='author'
                                value = {data.author}
                                onChange={handleChange}
                                required='required'
                                className="inp" 
                                placeholder="Writer"
                            />
                        </label>
                    </div>
                    
                    <div className="set">
                        <label className="lab">
                            <input 
                                type="number"  
                                name='sem'
                                value = {data.sem}
                                onChange={handleChange}
                                required='required'
                                className="inp" 
                                placeholder="Semester"
                            />
                        </label>
                        <label className="lab">
                            <input 
                                type="text"  
                                name='teacher'
                                value = {data.teacher}
                                onChange={handleChange}
                                required='required'
                                className="inp" 
                                placeholder="Teacher Name"
                            />
                        </label>
                    </div>
                    
                    <div className="set">
                        <label className="lab">
                            <input 
                                type="text"  
                                name='subject'
                                value = {data.subject}
                                onChange={handleChange}
                                required='required'
                                className="inp" 
                                placeholder="Subject"
                            />
                        </label>
                        <label className="lab">
                            <input 
                                name= 'image'
                                type ="file"
                                onChange ={fileChange}
                                className='inp'
                            />
                        </label>
                    </div>
                    
                    <br></br>
                    
                    {state.isAuth && load &&    
                            <button className="butt" type="submit"  ><i class="icon ion-md-lock"></i> Uploading</button>
                    } 
                    {state.isAuth && !load &&
                         <button className="butt" type="submit" onClick={onSubmit} ><i class="icon ion-md-lock"></i> Upload</button>
                    }  
                    {!state.isAuth &&
                        <Link to='/login' > <button className="butt" type="submit"><i class="icon ion-md-lock"></i>Login to Upload</button> </Link>                 
                    }
                    <br/>
                    {errors === 1 && 
                        <div style={{fontSize : '20px'}}>Fill all credentials</div>
                    }  

                    <br></br>

                    <p>* Maximum file size which you can upload must be less than 10 MB.</p>
                    <p>* Only .pdf, .docx, .ppt, .pptx files are acceptable for upload.</p>                  

                </form>
                
            </div>

        </>
    );
}

export default NotesUpload;
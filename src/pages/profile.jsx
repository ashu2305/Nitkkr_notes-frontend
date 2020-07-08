import React, { useState,  useEffect }  from 'react';

import axios from 'axios';
import config from '../config.json';

import './pages.css';
import './login.css';
import './profile.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'


const Profile = () => {
    const [user, setUser] = useState({

    });

    const [data, setData] = useState({
        college:"",
        branch:"",
        semester:""
    })
    
     //0 no error
    //1 is empty error
    //2 unauthorized(username exist but isVerified false)
    //3 username does not exist
    //4 Password does not match


    useEffect(() => {
        const getUser = async () => {

            try{
                const res = await axios({
                    url: `${config.BASE}/getUser`,
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.FBIdToken}`
                    }
                });

                if(res.data){
                    setUser(res.data);
                    //console.log(res.data);
                    //console.log(user);
                } 
            }
            catch(error) {
                console.log(error);
            }
        };

        getUser();
    }, []);

    const submit = async() =>{
        try{
            const result = await axios({
                url: `${config.BASE}/updateProfile`,
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.FBIdToken}`
                },
                data
            });
            if(result.data){
                console.log(result.data);
                setUser({
                    ...user,
                    branch: data.branch,
                    semester: data.semester,
                    college: data.college
                })
                handleClose();
            }
        }
        catch(error){
            console.log(error);
        }

    }

    const handleChange = e => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const onSubmit = () => {
        submit();
    }
  //console.log(user);
   
    return (
        <>
            {/* <div className="login-content"> */}

            <div className="pro">
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.1/css/all.css" integrity="sha384-gfdkjb5BdAXd+lj+gudLWI+BXq4IuLW5IT+brZEZsLFm++aCMlF1V92rMkPaX4PP" crossorigin="anonymous"></link>
                <main class="profile">
                    <div class="profile-bg"></div>
                    <div class="contain">
                        <aside class="profile-image">
                        
                        </aside>
                        <section class="profile-info">
                            <h1 class="first-name">{user.username}</h1>
                            <h2>ABOUT</h2>
                            <div>
                                <p>Hello {user.username}, how are you doing during quarantine ? Dear, user your <b>Email address </b> is <b>{user.email_id}</b> </p>
                                <p>you are an eminent student of <b>College: {user.college} </b></p>
                                <p>your specialization is in <b>{user.branch} </b> branch </p>
                                <p>you are currently in {user.semester==='1' && <b>1st </b>}{user.semester==='2' && <b>2nd </b>}{user.semester==='3' && <b>3rd </b>}{user.semester!=='1' && user.semester!=='2' && user.semester!=='3' && <b>{user.semester}th</b>} semester at {user.college}. You are our consistent user since <b>25 June</b> </p>
                            </div>
                            <div>
                                <Button variant="primary" onClick={handleShow}>
                                    Edit Details
                                </Button>
                                <Modal show={show} onHide={handleClose} animation={false}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit Details</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                         <Form>
                                            <Form.Group >
                                                <Form.Label>College Name</Form.Label>
                                                <Form.Control type="text" placeholder="Enter college name" onChange={handleChange} name="college" />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Branch</Form.Label>
                                                <Form.Control type="text" placeholder="Branch" onChange={handleChange} name="branch" />
                                            </Form.Group>

                                            <Form.Group>
                                                <Form.Label>Semester</Form.Label>
                                                <Form.Control type="text" placeholder="semester" onChange={handleChange} name="semester" />
                                            </Form.Group>
                                            
                                            </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose}>
                                            Close
                                        </Button>
                                        <Button variant="primary" onClick={onSubmit}>
                                            Submit
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        </section>
                    </div>
                    <section class="statistics">
                        <p><strong>{user.contribution}</strong> Contributions</p>
                    </section>
                </main>
                        
            </div>

        </>
    );
}

export default Profile;
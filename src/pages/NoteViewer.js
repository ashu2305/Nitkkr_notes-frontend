import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import NoteCard from './NoteCard'
import { Button } from 'react-bootstrap'


import axios from 'axios';

import config from '../config.json';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card'

import Store from '../store/store';

const NoteViewer = (props) => {
  const {state} = useContext(Store);
  const [data, setData] = useState({
    noteId: ''
  });
  const [comments, setComments] = useState([]);

  const [postComment, setpostComment] = useState('');

  const { noteId} = props.note

  const handleChange = e =>{
    setpostComment(e.target.value);
  };
  console.log(data);
  useEffect(() =>{
    const getComment = async () => {
      const data = {
        noteId : noteId
      }
        try{
          const res = await axios({
            url: `${config.BASE}/getComments`,
            method: "POST",
            data : data
          });
            setComments([...res.data]);
            console.log(res.data);
        }
        catch(error){
            console.log(error);
        }
    };
    getComment();
  }, []);


  const post = async() =>{
    const postData = {
      body: postComment,
      noteId : noteId
    }
    try{
      const res = await axios({
        url: `${config.BASE}/commentOnNote`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.FBIdToken}`
      },
        data : postData
      });
        
        if(res.data){
          console.log(res.data);
          window.alert("Comment added successfull");
        }
    }
    catch(error){
        console.log(error);
    }
  }
  console.log(comments);
  const onSubmit = e =>{
    e.preventDefault();
    if(postComment !== ''){
      post();
    }else{
      console.log("error");
    }
  }
  return(
    <>
      <div>
        <br></br><br></br><br></br>
        <NoteCard note={props.note} />
        <br></br>
        <div className="note-view-button">
          {state.isAuth ? 
            <Button variant="primary" size="lg"   href={props.note.noteUrl} >Download</Button>
            :
            <Link to='/login' ><Button variant="primary" size="lg">Login to Download</Button></Link>
          }
          
          {"  "}<Button variant="primary" size="lg" onClick={props.handleNoteGoBack}>Back</Button>{' '}
        </div>
      </div>
      <br/><br/><br/><br/><br/>

      <Container>
        <h3>Comments: </h3>
        <Row>
          <Col>
          
            <input
              type= "text"
              name = 'body'
              className="comment_input"
              onChange = {handleChange}
            />
          </Col>
          <Col>
          <Button onClick={onSubmit} variant="outline-primary">Comment</Button>
          </Col>
        </Row>
         
      </Container>
    </>
     )
}


export default NoteViewer
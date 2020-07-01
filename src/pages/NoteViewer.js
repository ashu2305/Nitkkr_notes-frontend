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


import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

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
  dayjs.extend(relativeTime);
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
           comments.push(res.data.noteData);
           setpostComment("");
           //console.log(comments);
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
      <div >
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

      <Container>
        <h2>Comments: </h2><hr/>
        <Row>
        <Col sm={1}></Col>
          <Col sm={6}>
          
            <input
              type= "text"
              name = 'body'
              value={postComment}
              className="comment_input"
              onChange = {handleChange}
            />
          </Col>
          <Col></Col>
          <Col>
          <Button onClick={onSubmit} variant="outline-primary">Comment</Button>
          </Col>
          
        </Row>
        <hr />
        <Row>
          {comments && 
            comments.map((m,i) => (
              <Col sm={12} key ={i}>
                <p style={{fontSize : "150%"}}>{m.body}</p>
                <Row>
                  <Col>
                    <pre> - By  {m.username}</pre>
                  </Col>
                  <Col></Col>
                  <Col>{dayjs(`${m.createdAt}`).fromNow()}</Col>
                </Row>


                <hr />
              </Col>
            ))

          }
        </Row>
         
      </Container>
    </>
     )
}


export default NoteViewer
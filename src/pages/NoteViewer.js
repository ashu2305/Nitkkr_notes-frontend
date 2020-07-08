import React, {useState, useEffect, useContext} from 'react';
import {Link, Redirect} from 'react-router-dom';
import NoteCard from './NoteCard'
import { Button } from 'react-bootstrap'


import axios from 'axios';

import config from '../config.json';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Store from '../store/store';

const NoteViewer = (props) => {
  const {state} = useContext(Store);
  
  const [comments, setComments] = useState([]);

  const [postComment, setpostComment] = useState('');

  const[load, setLoad] = useState(false);

  const [deleted, setDeleted] = useState(false);

  const [show, setShow] = useState(false);

  const { noteId} = props.note

  const handleChange = e => {
    setpostComment(e.target.value);
  };

  //console.log(data);
  dayjs.extend(relativeTime);

  useEffect(() => {
    const currentTime = new Date().getTime();
    const createdTime = Date.parse(props.note.createdAt);

    const time = currentTime - createdTime;
    let hours = Math.floor(time/3600000);
    console.log(hours);
    if(hours){
      setShow(false);
    }else{
      setShow(true);
    }

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
            //console.log(res.data);
        }
        catch(error){
            console.log(error);
        }
    };
    getComment();
  }, []);
  console.log(state.user);
  const post = async() => {
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
  
      if(res.data) {
        //console.log(res.data);
        window.alert("Comment added successfull");
          comments.push(res.data.noteData);
          setpostComment("");
          setLoad(false);
          //console.log(comments);
      }
    }
    catch(error) {
      setLoad(false);
        console.log(error);
    }
  }
  //console.log(comments);

  const onSubmit = e => {
    e.preventDefault();
    if(postComment !== '') {
      setLoad(true);
      post();
    }
    else{
      //console.log("error");
    }
  }
  const deletenote = async() =>{
    const deleteData = {
      noteId: props.note.noteId
    }
    try{
      const res = await axios({
        url: `${config.BASE}/deleteNote`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.FBIdToken}`
        },
        data: deleteData
      });
  
      if(res.data) {
        //console.log(res.data);
        setDeleted(true);
      }
    }
    catch(error) {
      //setLoad(false);
        console.log(error);
    }
  }
  if(deleted){
    return <Redirect to='/' />
  }



  const deleteNote = e =>{
    e.preventDefault();
    deletenote();
  }

  //console.log(props);
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
        <br/>
        <div className="note-view-button">
          {state.user === props.note.name && show && 
            <Button variant="primary" size="lg" onClick={deleteNote} >Delete</Button>
          }
        </div>
      </div>

      <Container>
        <h2>Comments: </h2><hr/>
        <Row>
        <Col sm={1}></Col>
          <Col sm={6}>
          {/* <input class="search__input" type="text" placeholder="Search"  */}
            <input
              type= "text"
              name = 'body'
              value={postComment}
              className="comment__input"
              onChange = {handleChange}
            />
          </Col>
          <Col xs={5} sm={2}></Col>
          <Col >
          {state.isAuth && !load &&
            <Button className="comment_button" onClick={onSubmit} variant="outline-primary">Comment</Button>
          }
          {state.isAuth && load &&
            <Button className="comment_button" variant="outline-primary">Loading</Button>
          }
          {!state.isAuth &&
            <Link to='/login'><Button className="comment_button"  variant="outline-primary">Login to Comment</Button></Link>

          }
          
          </Col>
          
        </Row>
        <hr />
        <Row>
            {comments.length !== 0 && 
              comments.map((m,i) => (
                <Col sm={12} key ={i}>
                  <p style={{fontSize : "150%"}}>{m.body}</p>
                  <Row>
                    <Col xs={8}>
                      <pre> - By  {m.username}</pre>
                    </Col>
                    <Col></Col>
                    <Col xs={3}>{dayjs(`${m.createdAt}`).fromNow()}</Col>
                  </Row>


                  <hr />
                </Col>
              ))

            }
            {comments.length === 0 &&
              <h1>No Comments yet !</h1>
            }
        </Row>
         
      </Container>
    </>
  )
}


export default NoteViewer
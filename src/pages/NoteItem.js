import React, {useState, useContext, useEffect} from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import axios from 'axios';

import config from '../config.json';


import liked from '../images/like (1).svg';
import unlike from '../images/like.svg';

import Store from '../store/store';

const NoteItem = (props) => {
    var {author, title, subject, createdAt,  noteId, likesarr} = props.note;

    const [isLike, setLike] = useState(false);

    const {state, dispatch } = useContext(Store);
    //console.log(state.user);
    useEffect(() =>{
        
        
            var array = likesarr ;
            var found = array.find(function(element) {
                return element === state.user;
            })
            //console.log(found);
            if(found === undefined){
                setLike(false);
            }else{
                setLike(true);
            }
        
        
    }, []);
    //console.log(isLike);
    //console.log(state.like);
    if(subject.length > 10){
        var res = subject.slice(0,7);
    
        res = res+ '...';
        subject = res;
    }
    if(title.length > 14){
        var res = title.slice(0,7);
    
        res = res+ '...';
        title = res;
    }
    if(author.length > 18){
        var res = author.slice(0,7);
    
        res = res+ '..';
        author = res;
    }
    //console.log(like);
     dayjs.extend(relativeTime);
     function arrayRemove(arr, value) {
        return arr.filter(function(ele){ 
            return ele != value; 
        });
    }

    const setLikeBack = async(m) =>{
        const postData = {
            flag: "LIKE",
            noteId,
        }
        try{
            const res = await axios({
                url: `${config.BASE}/like`,
                method: "POST",
                headers: {
                     Authorization: `Bearer ${localStorage.FBIdToken}`
                },
                data : postData
            });
            if(res.data){
                
                
                dispatch({
                    type: "LIKE",
                    payload: res.data
                });
                
            }


        }catch(error){
            console.log(error);
        }
    }
    
    const likeFun = (m) => {
       
        setLike(m);
        setLikeBack(m);
        
    }
     return (
          <div className="note-item-container"> 
               <div className="note-item" >
               
               <Row>
                    
                    <Col className="note-sub"><pre>{subject}</pre></Col>
                    
                    <Col className="note-time">{dayjs(`${createdAt}`).fromNow()}</Col>
                </Row>
                <Row>
                    <Col className="note-img-div"><p>{title} </p></Col>
                </Row>
                    
                    
                    <div className="note-info">
                         <pre>{'     '}By {author} </pre>
                    </div>  
                    
                    <Button className='note-view' onClick={() => props.handleNoteView(props.note)} variant="outline-primary">View/Download Note</Button>
                    <div>
                        <br/>
                    </div>
                    <Row>
                        <Col>
                        {isLike ? (
                            
                                    <img onClick={() => likeFun(false)}  src={liked} height="26" width="26" />
                                
                            ) : (
                            
                                    <img onClick={() => likeFun(true)}  src = {unlike} height="26" width="26" />
                                
                            )
                        
                        }
                        </Col>
                        
                        
                    </Row>

               </div>
          </div>
     )
}

export default NoteItem
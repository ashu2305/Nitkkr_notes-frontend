import React from 'react';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Button } from 'react-bootstrap';

const NoteItem = (props) => {
     const {name, title, subject, createdAt} = props.note;

     dayjs.extend(relativeTime);
     return (
          <div className="note-item-container"> 
               <div className="note-item" >
                    <div className="note-img-div">
                         <p>{title} </p>
                    </div>
                    <div className="note-sub">
                         <p>{subject} </p>
                    </div>
                    <div className="note-info">
                         <pre>By  {name} </pre>
                    </div>  
                    <div className="note-time">
                         <pre>{dayjs(`${createdAt}`).fromNow()}</pre>
                    </div>
                    <Button className='note-view' onClick={() => props.handleNoteView(props.note)} variant="outline-primary">View/Download Note</Button>
                    <div className="clear"></div>
               </div>
          </div>
     )
}

export default NoteItem
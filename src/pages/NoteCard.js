import React from 'react';



import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

const NoteCard = (props) => {
  
  const {name, title, author, sem, subject, teacher, createdAt} = props.note
  //console.log(sem);
  
  
  
  dayjs.extend(relativeTime);
  return(
    <>
      <div className="note-card-container"> 
        <div className="note-card" >
          
            <h1><b>Title : </b>{title} </h1>
            <h3><b>Subject : </b>{subject} </h3>
            <p><b>Uploaded by : </b>{name} </p>
            <p><b>Writer : </b> {author}</p>
            <p><b>Semester : </b> {sem}</p>
            <p><b>Teacher Name : </b> {teacher}</p>
            <p><b>Upload : </b> {dayjs(`${createdAt}`).fromNow()}</p>

          <div className="clear"></div>
        </div>  
      </div>
      
    </>
  )
}

export default NoteCard
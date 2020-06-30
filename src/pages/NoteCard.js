import React, {useEffect, useState} from 'react'


const NoteCard = (props) => {
  
  const {name, title, author, sem, noteId} = props.note
  //console.log(sem);
  
  
  return(
    <>
      <div className="note-card-container"> 
        <div className="note-card" >
            <h2><b>Title : </b>{title} </h2>
            <p><b>Name : </b>{name} </p>
            <p><b>Author : </b> {author}</p>
            <p><b>Semester : </b> {sem}</p>

          <div className="clear"></div>
        </div>  
      </div>
      
    </>
  )
}

export default NoteCard
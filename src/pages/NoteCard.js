import React from 'react'

const NoteCard = (props) => {
 
   const {name, title, author, sem} = props.note
         console.log(sem);
  return(
   <div className="note-card-container"> 
      <div className="note-card" >
          <h2><b>Name : </b>{name} </h2>
          <p><b>Title : </b>{title} </p>
          <p><b>Author : </b> {author}</p>
          <p><b>Semester : </b> {sem}</p>

        <div className="clear"></div>
     </div>  
   </div>
    )
}

export default NoteCard
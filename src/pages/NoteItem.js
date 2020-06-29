import React from 'react'

const NoteItem = (props) => {
 
   const {name, title} = props.note;

  return(
   <div className="note-item-container"> 
     <div className="note-item" onClick={() => props.handleNoteView(props.note)}>
        <div className="note-img-div">
             <h2>{title} </h2>
        </div>
        <div className="note-info">
             <h2>{name} </h2>
        </div>  
        <div className="clear"></div>
     </div>
   </div>
    )
}


export default NoteItem
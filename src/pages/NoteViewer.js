import React from 'react'
import NoteCard from './NoteCard'

const NoteViewer = (props) => {
  
  return(
     <div>
       <br></br><br></br><br></br>
       <NoteCard note={props.note} />
       <br></br>
       <button onClick={props.handleNoteGoBack}>Download</button>
       <button onClick={props.handleNoteGoBack}>Back</button>
     </div>
     )
}


export default NoteViewer
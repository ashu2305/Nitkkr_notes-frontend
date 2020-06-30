import React from 'react'
import NoteCard from './NoteCard'
import { Button } from 'react-bootstrap'

const NoteViewer = (props) => {
  
  return(
     <div>
       <br></br><br></br><br></br>
       <NoteCard note={props.note} />
       <br></br>
        <Button variant="primary" size="lg" onClick={props.handleNoteGoBack}  href={props.note.noteUrl} >Download</Button>{' '}
        <Button variant="primary" size="lg" onClick={props.handleNoteGoBack}>Back</Button>{' '}
     </div>
     )
}


export default NoteViewer
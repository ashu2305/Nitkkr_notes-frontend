import React from 'react'
import NoteItem from './NoteItem'

const NoteList = (props) => {

   console.log(props.inputValue)
   console.log(props)

  return(
 <> 
   <label htmlFor="search">Search by name </label>
   <input type="text" value ={props.inputValue}  onChange={props.noteFilterOnChange}/>
     <div className="note-list">
        {
           props.notes.map(note => {
           return <NoteItem note={note} key={note.id} handleNoteView={props.handleNoteView}/>
           })
        }
     </div>
  </>
    )
}

export default NoteList
import React from 'react'
import NoteItem from './NoteItem'

const NoteList = (props) => {

   console.log(props.inputValue)
   console.log(props)

  return(
 <> 
   <div class="search__container">
      <input class="search__input" type="text" placeholder="Search"  value ={props.inputValue}  onChange={props.noteFilterOnChange}/>
   </div>
   
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
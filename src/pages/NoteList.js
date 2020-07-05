import React from 'react'
import NoteItem from './NoteItem'

const NoteList = (props) => {
   
   return(
      <> 
         <div class="search__container">
            <input class="search__input" type="text" placeholder="Search"  value ={props.inputValue}  onChange={props.noteFilterOnChange}/>
         </div>
         <div className="note-list" >
            {
               props.notes.map((note, i) => {
               return <NoteItem note={note} key={i} handleNoteView={props.handleNoteView}/>
               })
            }  
         </div>
      </>
   )
}

export default NoteList
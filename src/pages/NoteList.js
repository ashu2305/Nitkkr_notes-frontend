import React, {useEffect, useContext} from 'react'
import NoteItem from './NoteItem';

import axios from 'axios';
import config from '../config.json';

import Store from '../store/store';

const NoteList = (props) => {
    console.log(props.notes.likesarr);
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
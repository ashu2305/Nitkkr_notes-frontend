import React, { Component } from 'react'
import NoteList from './NoteList'
import NoteViewer from './NoteViewer'

class NoteContainer extends Component {

 state = {
   notes: [],
   note: {},
   isNoteViewOn: false,
   sortValue: 'Name',
   inputValue: '',
 }
 
 componentDidMount(){
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' }
};
   fetch('https://us-central1-nitkkrnotes-3130a.cloudfunctions.net/api/getNotes',requestOptions)
   .then(res => res.json())
   .then(notesData => {
    //  console.log(notesData)
    this.setState({
      notes: notesData
    })
   })
 }

 noteFilterOnChange = (event) => {
   console.log("hi from onChange", event.target.value)
   this.setState({
     inputValue: event.target.value
   })

 }

 handleSortNotes = (event) => {
  //  console.log("sort button", this.state.sortValue)
   this.setState({
     sortValue: event.target.value
   })
 }

 sortNotes = (notes) => {
   console.log(this.state.sortValue);
   if(this.state.sortValue === "Name") {
     return [...notes].sort((a,b) => {
       if(a.name > b.name) {
         return 1
       }else if (a.name < b.name) {
         return -1
       }else {
         return 0
       }
     })
   }
   else if(this.state.sortValue === "Title") {
     console.log(notes);
    return [...notes].sort((a,b) => {
      if(a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1
      }else if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1
      }else {
        return 0
      }
    })
  }
  else {
    return notes
  }

 }

 handleNoteView = (noteItem) => {
   console.log("click", noteItem)
   this.setState({
     note: noteItem,
     isNoteViewOn: !this.state.isNoteViewOn
   })
 }

 handleNoteGoBack = ()=>{
  this.setState({
    note: {},
    isNoteViewOn: false
  })
 }

 render() {
  const type = this.state.sortValue.toLowerCase();
  let filteredNotes;
  if(type === '' || type === 'name'){
   filteredNotes = 
    this.state.notes.filter(note => {
    return note.name.toLowerCase().includes(this.state.inputValue.toLowerCase())
  })
  }
  else if(type === 'title'){
    filteredNotes = 
    this.state.notes.filter(note => {
    return note.title.toLowerCase().includes(this.state.inputValue.toLowerCase())
  })
  }
  
  

  return(
   <div className="note-container">
      <br></br>
      <label>Sort Notes</label>
      
      <select name="sortValue" onChange={this.handleSortNotes}>
        <option value="All">All</option>
        <option value="Title">Title</option>
        <option value="Name">Name</option>
        <option value="Name">Author</option>
        <option value="Name">Teacher</option>
        <option value="Name">Semester</option>
      </select>
 
       {
         this.state.isNoteViewOn ? 
         <NoteViewer  note={this.state.note} 
                     handleNoteGoBack={this.handleNoteGoBack} /> 
                     :
         <NoteList notes={this.sortNotes(filteredNotes)} 
                  handleNoteView={this.handleNoteView}
                  noteFilterOnChange={this.noteFilterOnChange}
                  inputValue={this.state.inputValue} /> 
       }  
   </div>
    )
   }
 }

export default NoteContainer
import React, { Component } from 'react'
import NoteList from './NoteList'
import NoteViewer from './NoteViewer'
import config from '../config.json';

import './notesSearch.css';

class NoteContainer extends Component {
  state = {
    notes: [],
    note: {},
    isNoteViewOn: false,
    sortValue: 'Name',
    inputValue: '',
    showScroll: false
  }
 
  componentDidMount(){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    };

    fetch(`${config.BASE}/getNotes`,requestOptions)
    .then(res => res.json())
    .then(notesData => {
      //  console.log(notesData)
      this.setState({
        notes: notesData
      })
    })

    window.addEventListener('scroll', this.checkScrollTop);
  }

  noteFilterOnChange = (event) => {
    //console.log("hi from onChange", event.target.value)
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
   //console.log(this.state.sortValue);
    if(this.state.sortValue === "Name") {
      return [...notes].sort((a,b) => {
        if(a.name > b.name) {
          return 1
        }
        else if (a.name < b.name) {
          return -1
        }
        else {
          return 0
        }
      })
    }
    else if(this.state.sortValue === "Title") {
      //console.log(notes);
      return [...notes].sort((a,b) => {
        if(a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1
        }
        else if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1
        }
        else {
          return 0
        }
      })
    }
    else if(this.state.sortValue === "Author") {
      //console.log(notes);
      return [...notes].sort((a,b) => {
        if(a.author.toLowerCase() > b.author.toLowerCase()) {
        return 1
        }
        else if (a.author.toLowerCase() < b.author.toLowerCase()) {
          return -1
        }
        else {
          return 0
        }
      })
    }
    else if(this.state.sortValue === "Teacher") {
      //console.log(notes);
      return [...notes].sort((a,b) => {
        if(a.teacher.toLowerCase() > b.teacher.toLowerCase()) {
          return 1
        }
        else if (a.teacher.toLowerCase() < b.teacher.toLowerCase()) {
          return -1
        }
        else {
          return 0
        }
      })
    }
    else if(this.state.sortValue === "Semester") {
      //console.log(notes);
      return [...notes].sort((a,b) => {
        if(a.sem > b.sem) {
          return 1
        }
        else if (a.sem < b.sem) {
          return -1
        }
        else {
          return 0
        }
      })
    }
    else if(this.state.sortValue === "Subject") {
      //console.log(notes);
      return [...notes].sort((a,b) => {
        if(a.subject > b.subject) {
          return 1
        }
        else if (a.subject < b.subject) {
          return -1
        }
        else {
          return 0
        }
      })
    }
    else {
      return notes
    }
  }
  

  handleNoteView = (noteItem) => {
    //console.log("click", noteItem)
    this.setState({
      note: noteItem,
      isNoteViewOn: !this.state.isNoteViewOn
    })
  }

  handleNoteGoBack = ()=> {
    this.setState({
      note: {},
      isNoteViewOn: false
    })
  }
  
    checkScrollTop = () => {    
    if (!this.state.showScroll && window.pageYOffset > 200){
      this.setState({
        showScroll:true
      })  
    } else if (this.state.showScroll && window.pageYOffset <= 200){
      this.setState({
        showScroll:false
      })    
    }  
    };
    

    scrollTop = () =>{
        window.scrollTo({top: 0, behavior: 'smooth'});
     };

  render() {
    const type = this.state.sortValue.toLowerCase();
    let filteredNotes;
    if(type === '' || type === 'name') {
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
    else if(type === 'author'){
      filteredNotes = 
      this.state.notes.filter(note => {
      return note.author.toLowerCase().includes(this.state.inputValue.toLowerCase())
      })
    }
    else if(type === 'teacher'){
      filteredNotes = 
      this.state.notes.filter(note => {
      return note.teacher.toLowerCase().includes(this.state.inputValue.toLowerCase())
      })
    }
    else if(type === 'semester'){
      filteredNotes = 
      this.state.notes.filter(note => {
      return note.sem.toLowerCase().includes(this.state.inputValue)
      })
    }
    else if(type === 'subject'){
      filteredNotes = 
      this.state.notes.filter(note => {
      return note.subject.toLowerCase().includes(this.state.inputValue.toLowerCase())
      })
    }
  
    return (
      <div className="note-container">
        <div onClick={this.scrollTop} className="scrolltopbtn" style={{ display: this.state.showScroll ? 'flex' : 'none'}}>Top</div>
            
        <br></br>
        {!this.state.isNoteViewOn &&
        <>
          <label className="labe">Filter Notes</label>
          <div class="box">
            <select  name="sortValue" onChange={this.handleSortNotes}>
            <option value="Name">All</option>
            <option value="Title">Title</option>
            <option value="Subject">Subject</option>
            <option value="Name">Name</option>
            <option value="Author">Writer</option>
            <option value="Teacher">Teacher</option>
            <option value="Semester">Semester</option>
            </select>
          </div>
          </>
        }
        {
          this.state.notes.length > 0 ? (
            <>
            {
              this.state.isNoteViewOn ? 
              <NoteViewer   note={this.state.note} 
                            handleNoteGoBack={this.handleNoteGoBack} /> 
                          :
              <NoteList notes={this.sortNotes(filteredNotes)} 
                        handleNoteView={this.handleNoteView}
                        noteFilterOnChange={this.noteFilterOnChange}
                        inputValue={this.state.inputValue} /> 
            }
            </>
          )
          : <div><h1>loading...</h1></div>
        }
          
      </div>
    )
  }
}

export default NoteContainer
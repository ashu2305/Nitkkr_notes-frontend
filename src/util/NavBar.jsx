import React, {useContext} from 'react';
import {Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './NavBar.css';
import store from '../store/store';

const NavBar = () => {
  const {state} = useContext(store);
    return(
        
        <>
          <Navbar sticky="top" collapseOnSelect="true" expand="lg" bg="primary" variant="dark">
            <Navbar.Brand href="/" className='Nav-head'>Notes Club</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <div className = 'Nav-item-br'><Nav.Item className='Nav-a'><Nav.Link eventKey="1" as={Link} to="/">Home</Nav.Link></Nav.Item></div>    
                <div className = 'Nav-item-br'><Nav.Item><Nav.Link eventKey="2" as={Link} to="/notesUpload">Upload Notes</Nav.Link></Nav.Item></div>    
                <div className = 'Nav-item-br'><Nav.Item><Nav.Link eventKey="3" as={Link} to="/SearchNotes">Search Notes</Nav.Link></Nav.Item></div>    
              </Nav>
              <Nav>
                {state.isAuth && 
                    <div className = 'Nav-item-br'><Nav.Item><Nav.Link eventKey="4" as={Link} to="/profile">Profile</Nav.Link></Nav.Item></div>
                }
                {state.isAuth && 
                    <div className = 'Nav-item-br'><Nav.Item><Nav.Link eventKey="5" as={Link} to="/logout">Logout</Nav.Link></Nav.Item></div>
                }
        
                {!state.isAuth && 
                    <div className = 'Nav-item-br'><Nav.Item><Nav.Link eventKey="6" as={Link} to="/login">Login</Nav.Link></Nav.Item></div>
                }
                {!state.isAuth && 
                    <div className = 'Nav-item-br'><Nav.Item><Nav.Link eventKey="7" as={Link} to="/signup">Sign Up</Nav.Link></Nav.Item></div>      
                }
              
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </>
    );
}

export default NavBar;

//loading 
//onn hover search pe
// profile page
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
          <Navbar fixed="top" collapseOnSelect expand="lg" bg="primary" variant="dark">
            <Navbar.Brand href="/" className='Nav-head'>Notes Club</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <div className = 'Nav-item-br'><Nav.Item><Link className='Nav-a' to = '/'>Home</Link></Nav.Item></div>    
                <div className = 'Nav-item-br'><Nav.Item ><Link className='Nav-a' to = '/notesUpload'>Upload Notes</Link></Nav.Item></div>    
                <div className = 'Nav-item-br'><Nav.Item ><Link className='Nav-a' to = '/SearchNotes'>Search Notes</Link></Nav.Item></div>    
              </Nav>
              <Nav>
                {state.isAuth && 
                    <div className = 'Nav-item-br'><Nav.Item ><Link className='Nav-a' to = '/profile'>Profile</Link></Nav.Item></div>
                }
                {state.isAuth && 
                    <div className = 'Nav-item-br'><Nav.Item ><Link className='Nav-a' to = '/logout'>Logout</Link></Nav.Item></div>
                }
        
                {!state.isAuth && 
                    <div className = 'Nav-item-br'><Nav.Item ><Link className='Nav-a' to = '/login'>Login</Link></Nav.Item></div>
                }
                {!state.isAuth && 
                    <div className = 'Nav-item-br'><Nav.Item ><Link className='Nav-a' to = '/signup'>SignUp</Link></Nav.Item></div>      
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
import React, {useContext, useReducer} from 'react';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import Button from 'react-bootstrap/Button';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './util/NavBar';


import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import logout from './pages/logout';
import ForgotPass from './pages/ForgotPass';
import ChangePassword from './pages/ChangePassword';
import NoteContainer from './pages/NoteContainer';
import notesUpload from './pages/notesUpload';
import profile from './pages/profile';
import error from './pages/error';

import Store from './store/store';
import rootReducer from './rootReducer/rootReducer';


const  App = () => {
   const initState = useContext(Store);
   const [state, dispatch] = useReducer(rootReducer, initState);


  return (
    <>
    <Store.Provider value={{state,dispatch}} >
      <div className="App">
      <Router>
        <NavBar  />
        <Switch>
          <Route exact path = '/' component ={home} />
          <Route path = '/login' component = {login} />
          <Route path = '/logout' component = {logout} />
          <Route path = '/signup' component = {signup} />
          <Route path = '/ForgotPass' component = {ForgotPass} />
          <Route path = '/ChangePassword' component = {ChangePassword} />
          <Route exact path ={"/SearchNotes"} render={renderProps => <NoteContainer renderProps={renderProps}/>}/>
          <Route path = '/notesUpload' component = {notesUpload} />
          <Route path = '/profile' component = {profile} />
          <Route path = '/*' component = {error} />
        </Switch>
      </Router>
      </div>
    </Store.Provider>  
    </>
  );
}

export default App;

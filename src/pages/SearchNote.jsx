import React, { useState, useContext }  from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

import { Redirect, Link } from 'react-router-dom';

import axios from 'axios';
import config from '../config.json';

import Store from '../store/store';

import './login.css';

import Avatar from '../images/avatar.svg';
import LoginMobile from '../images/search-bg.svg';
import Wavebg from '../images/wave.png';

import './pages.css';

import './AutoCompleteText.css';
import countries from './countries';

class AutoCompleteText extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            suggestions: [],
            text: '',
        };
    }

    onTextChanged = (e) => {
        const {items} = this.props;
        const value = e.target.value;
        let suggestions = [];
        if(value.length > 0){
            const regex = new RegExp(`^${value}`,'i');
            suggestions = items.sort().filter(v => regex.test(v));
        }

        this.setState(() => ({suggestions , text: value}));
    }

    suggestionSelected (value) {
        this.setState(() => ({
            text: value,
            suggestions: [],
        }))
    }

    renderSuggestions () {
        const { suggestions } = this.state;
        if(suggestions.length === 0){
            return null;
        }
        return (
            <ul>
                {suggestions.map((item) => <li onClick={() => this.suggestionSelected(item)}>{item}</li>)}
            </ul>
        );
    }

    render () {
        const {text} = this.state;
        return (
            <div>
                <input value={text} onChange={this.onTextChanged} type="text" />
                {this.renderSuggestions()}
            </div>
        )
    }
}

const SearchNotes = () =>{
    const{ state, dispatch } = useContext(Store);
    const [data, setData] = useState({
        search: '',
        type: ''
    });
    
    const [errors, setError] = useState(0); 

    
    const handleChange = e =>{
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const verify = async() => {
        try{
            const res = await axios.post(
                `${config.BASE}/getNotes` , 
                data
            );
            console.log(res);
            if(res.data)
            {
                console.log(res.data);
                localStorage.setItem('notes', `${res.data}`);
                dispatch({
                    type: 'ONBOARD',
                    payload: res.data
                });
                // localStorage.setItem('FBIdToken', `${res.data.token}`);
                // dispatch({
                //     type: 'ONBOARD',
                //     payload: res.data.token
                // });
            }           
        }catch(error){
            // if(error.response.data.non_field_errors[0] === 'wrong'){
            //     setError(2);
            // }

            
            console.log(error);
        }   
    }
   


    const onSubmit = e =>{
        e.preventDefault();
        if(data.type !== '' && data.search !== ''){
            setError(0);
            console.log(data.type)
            console.log(data.search)
            verify();            
            //samp();
        }else{
            setError(1);
        }

        console.log(data.type)
        console.log(data.search)
        
        console.log("hello in submit");
    }

    //console.log(state.isAuth); 

    return(
        <>
            <img className="wave" src={Wavebg}></img>
            <div className="container_login">
                <div className="img">
                    <img src={LoginMobile}></img>
                </div>
                <div className="login-content">
                    <form >
                        <img src={Avatar}></img>
                        <h3 className="title">Search Notes</h3>
                        
                            <div className="i">
                                    <i className="fas fa-user"></i>
                            </div>
                            <br></br><br></br>
                            
                            <Form.Group onChange={handleChange}>
                                <Form.Control as="select" size="lg" name="type" placeholder="Select the type">
                                    <option>username</option>
                                    <option>subject</option>
                                    <option>teacherName</option>
                                    <option>author</option>
                                    <option>semester</option>
                                </Form.Control>
                                <br></br>
                                <br />
                            </Form.Group>
                
                            <h4>Search Value</h4>
                            <div className="AutoCompleteText">
                                    <AutoCompleteText items={countries}/>
                            </div>
                        
                            <br></br><br></br>
                        
                        {/* <a href="#">Forgot Password?</a> */}
                        <input type="submit" className="btn_login" onClick={onSubmit} value="Search" />

                        <br></br>

                        {/* {samp} */}
                        {errors=== 1 && 
                            <p>Please fill all credentials</p>
                        }
                        {errors === 2 &&
                            <p>Wrong Credentials</p>
                        }
                    </form>
                    
                </div>
            </div>

        </>
    );
}

export default SearchNotes;
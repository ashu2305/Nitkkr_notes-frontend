import { createContext } from 'react';
import jwt from 'jsonwebtoken';

const ltoken = (localStorage.getItem('FBIdToken') !== null)?true:false ;
var decode = null;
if(ltoken){
    const token = localStorage.FBIdToken;
    decode = jwt.verify(token,'notes were very important');
    console.log(decode);
}

const Context = createContext({
    user: (decode!==null)?decode.username:null ,
    isAuth: (ltoken)?true:false,
    token: localStorage.FBIdToken
})

export default Context;
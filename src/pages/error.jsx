import React, { useContext, useEffect } from 'react'
import {Link} from 'react-router-dom';

import Store from '../store/store';
import '../pages/error.css';

const Error = () => {

    return(
        <>
            <div className="errorbody">
                <aside className="erroraside"><img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/4424790/Mirror.png" alt="404 Image" /></aside>
                <main className="errormain">
                    <h1>Sorry!</h1>
                    <p>
                        Either you aren't cool enough to visit this page or it doesn't exist <em>. . . like your social life.</em>
                    </p>
                    <Link to='/'><button>You can go now!</button></Link>
                </main>
            </div>
        </>
    );
    
}
export default Error;
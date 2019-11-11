import React from 'react';
import ReactDOM from 'react-dom';
import './Resources/css/app.css';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
//importing firebase for private routing and login
import { firebase } from "./firebase";

const App = (props) => {
    return (
            <BrowserRouter>
               <Routes {...props}/>            
            </BrowserRouter>
    )
}


// if user email was correct user return a Q object else user == null

firebase.auth().onAuthStateChanged((user) => {
    console.log(user)
    ReactDOM.render(<App  user={user} com/>, document.getElementById('root'));
})




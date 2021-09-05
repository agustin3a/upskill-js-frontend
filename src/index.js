import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import ReactDom from 'react-dom';
import Navbar from './components/general/Navbar';
import Login from './components/user/login/Login';


const Main = () => {
  return (
    <>
      <Navbar />
    </>
  )
}

ReactDom.render(<Main />, document.getElementById("root") );
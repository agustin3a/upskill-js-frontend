import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useState} from 'react';
import ReactDom from 'react-dom';
import Navbar from './components/general/Navbar';
import Welcome from './components/general/welcome/Welcome';
import Footer from './components/general/Footer';


const Main = () => {
  return (
    <>
      <Navbar />
      <Welcome />
      <Footer />
    </>
  )
}

ReactDom.render(<Main />, document.getElementById("root") );
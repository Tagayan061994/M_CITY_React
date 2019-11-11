//High order Component Hoc

import React from 'react';
import Header from '../Components/Header_Footer/Header.jsx';
import Footer from '../Components/Header_Footer/Footer.jsx'


const Layout = (props) => {
  return(
    <div>
        <Header/>
           {props.children}
        <Footer/>
    </div>
  );
};

export default Layout;
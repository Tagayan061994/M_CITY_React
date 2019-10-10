import React from 'react';
import Header from '../Components/Header_Footer/Header.jsx'


const Layout = (props) => {
  return(
    <div>
        <Header/>
        {props.children}
    </div>
  );
};

export default Layout;
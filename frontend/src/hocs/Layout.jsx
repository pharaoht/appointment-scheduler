import React from 'react'
import Navbar from '../components/NavBar';

const Layout = (props) => (
    <div>
        <Navbar/>
        {props.children}
    </div>
)

export default Layout;
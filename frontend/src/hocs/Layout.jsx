import React, { useEffect } from 'react'
import Navbar from '../components/NavBar/NavBar';
import { connect } from 'react-redux'
import { checkAuthenticated, load_user } from '../actions/auth';
import './Layout.css'
import Sidebar from '../components/Sidebar/SideBar';


const Layout = (props) => {
    useEffect(() => {
        props.checkAuthenticated();
        props.load_user();
    }, [])

    return (
        <div className="main-container">
            <Navbar />
            <div>
                <Sidebar />
            </div>

            {props.children}
        </div>
    )

}

export default connect(null, { checkAuthenticated, load_user })(Layout);
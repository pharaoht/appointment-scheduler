import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../../actions/auth';
import './NavBar.css'
import photo1 from '../../media/petlogo.jpg'

const Navbar = ({ logout, isAuthenticated, user }) => {
    const [userData, setUserData] = useState([])
    useEffect(() => {
        setUserData(user)
    }, [user])


    const guestLinks = () => {
        return (
            <Fragment>
                <li className="links">
                    <Link className="nav-link" to='/login'>Login</Link>
                </li>
                <li className="links">
                    <Link className="nav-link" to='/signup'>Sign Up</Link>
                </li>
            </Fragment>
        )
    }

    const authLinks = () => {
        return (
            <Fragment>
                <li className="links">
                    <a> Welcome, {userData ? userData.first_name : ""} </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#!" onClick={logoutHandler}>Logout</a>
                </li>
            </Fragment>
        )
    }

    const logoutHandler = () => {
        logout()
    }

    const toggleBtn = () => {
        const toggle = document.getElementById('toggle');
        const navbar = document.getElementById('navbar');
        const header = document.getElementById('header')
        toggle.classList.toggle('active')
        navbar.classList.toggle('active')

    }

    return (
        <header id="header" >
            <a href="/" className="logo">Patitas Limpias</a>
            <div id="toggle" onClick={toggleBtn}></div>
            <div id="navbar">
                <ul>
                    <li><a>Contact</a></li>
                    <li><a>Translate</a></li>
                    {isAuthenticated ? authLinks() : guestLinks()}
                </ul>
            </div>

        </header>
    )


}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user

})

export default connect(mapStateToProps, { logout })(Navbar);
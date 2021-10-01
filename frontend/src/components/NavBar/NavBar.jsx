import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../../actions/auth';
import './NavBar.css'


const Navbar = ({ logout, isAuthenticated, user }) => {
    const [userData, setUserData] = useState([])
    useEffect(() => {
        setUserData(user)

    }, [user])

    const guestLinks = () => {
        return (
            <Fragment>
                <li className="links">
                    <Link className="nav-link" to='/login'>Iniciar Sesión</Link>
                </li>
                <li className="links">
                    <Link className="nav-link" to='/signup'>Registrarse</Link>
                </li>
            </Fragment>
        )
    }

    const authLinks = () => {
        return (
            <Fragment>
                <li className="links">
                    <a> Bienvenido, {userData ? userData.first_name : ""} </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#!" onClick={logoutHandler}>Cerrar sesión</a>
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
        toggle.classList.toggle('active')
        navbar.classList.toggle('active')

    }

    return (
        <header id="header" >
            <a href="/" className="logo">Patitas Limpias</a>
            <div id="toggle" onClick={toggleBtn}></div>
            <div id="navbar">
                <ul>
                    <li><a></a></li>
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
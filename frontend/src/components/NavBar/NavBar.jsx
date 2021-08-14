import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../../actions/auth';
import './NavBar.css'
import photo1 from '../../media/petlogo.jpg'

const Navbar = ({ logout, isAuthenticated }) => {
    const guestLinks = () => {
        return (
            <Fragment>
                <div className="links">
                    <Link className="nav-link" to='/login'>Login</Link>
                </div>
                <div className="links">
                    <Link className="nav-link" to='/signup'>Sign Up</Link>
                </div>
            </Fragment>
        )
    }

    const authLinks = () => {
        return (
            <li className="nav-item">
                <a className="nav-link" href="#!" onClick={logout}>Logout</a>
            </li>
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
            <a href="#" className="logo">Patitas Limpias</a>
            <div id="toggle" onClick={toggleBtn}></div>
            <div id="navbar">
                <ul>
                    <li><a>Login</a></li>
                    <li><a>Sign Up</a></li>
                    <li><a>Contact</a></li>
                    <li><a>Translate</a></li>
                </ul>
            </div>

        </header>
    )


}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Navbar);


        // <div className="bg-light">
        //     <div className="logo-brand">
        //         <img className="img-logo" src={photo1} />

        //     </div>
        //     <div className="info-nav">
        //         <div className="trans-lang">
        //             {isAuthenticated ? authLinks() : guestLinks()}

        //         </div>
        //         <div className="nav-links">
        //             <div><Link className="links" to='/services'>Services</Link></div>
        //             <div><Link className="links" to='/services'>Appointments</Link></div>
        //             <div><Link className="links" to='/services'>About Us</Link></div>
        //             <div><Link className="links" to='/services'>Reviews</Link></div>
        //         </div>
        //     </div>



        // </div>




        // <nav className="navbar navbar-expand-lg navbar-light bg-light">
        //     <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        //         <ul className="navbar-nav">
        //             <li><Link className="nav-item nav-link active" to="/">Home </Link></li>
        //             {isAuthenticated ? authLinks() : guestLinks()}


        //         </ul>
        //     </div>
        // </nav> 
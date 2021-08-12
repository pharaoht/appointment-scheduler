import React, { Fragment } from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../actions/auth';

const Navbar = ({ logout, isAuthenticated }) => {
    const guestLinks = () => {
        return (
            <Fragment>
                <li className="nav-item">
                    <Link className="nav-link" to='/login'>Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to='/signup'>Sign Up</Link>
                </li>
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


    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="navbar-nav">
                    <li><Link className="nav-item nav-link active" to="/">Home </Link></li>
                    {isAuthenticated ? authLinks() : guestLinks()}


                </ul>
            </div>
        </nav>
    )


}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Navbar);
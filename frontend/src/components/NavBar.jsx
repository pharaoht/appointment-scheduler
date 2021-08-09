import React from 'react'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import { logout } from '../actions/auth';

const Navbar = ({ logout, isAuthenticated }) => {
    const guestLinks = () => {

    }

    const authLinks = () => {

    }


    return (
        <div>
            <Link to="/signup">Sign up</Link>
        </div>
    )


}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { logout })(Navbar);
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { login } from '../actions/auth';

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault()
        login(email, password)

    }

    if (isAuthenticated) {
        window.location.href = "/"
    }

    return (
        <>
            <div className='container mt-5'>
                <h1>Sign In</h1>
                <p>Sign into your account</p>
                <form onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                        <input
                            className='form-control'
                            type='email'
                            placeholder='email'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required

                        />
                    </div>
                    <div className='form-group'>
                        <input
                            className='form-control'
                            type='password'
                            placeholder='password'
                            name='password'
                            value={password}
                            onChange={e => onChange(e)}
                            minLength='6'
                            required
                        />
                    </div>
                    <button className='btn btn-primary' type='submit'>Login</button>
                </form>
                <p>Don't have an account? <Link to='/signup'>Sign up</Link></p>
                <p>Forgot your password <Link to='/rest-password'>Reset Password</Link></p>
            </div>
        </>
    )
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);

//ctrl + D 
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { signup, login } from '../../actions/auth';

import './Signup.css'

const Signupv2 = ({ signup, isAuthenticated, login }) => {
    const [accountCreated, setAccountCreated] = useState(false)
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        re_password: ""
    });

    const { first_name, last_name, email, password, re_password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault()

        if (password === re_password) {
            signup(email, first_name, last_name, password, re_password)
            setAccountCreated(true)
        }

        if (isAuthenticated) {
            let regBtn = document.getElementById('reg-btn')
            regBtn.disabled = true
        }


    }
    //--------------------------------------------------------------------------------------------------------
    const [formData2, setFormData2] = useState({
        email2: "",
        password2: ""
    });

    const { email2, password2 } = formData2;

    const onChange2 = e => setFormData2({ ...formData2, [e.target.name]: e.target.value });

    const onSubmit2 = e => {
        e.preventDefault()
        login(email2, password2)


    }

    if (isAuthenticated) {
        return <Redirect to='/' />
    }

    const signinBtn = () => {
        const formBx = document.querySelector('.formBx')
        const body = document.querySelector('.body-im')
        body.classList.remove('active')
        formBx.classList.remove('active')
    }
    const signupBtn = () => {
        const formBx = document.querySelector('.formBx')
        const body = document.querySelector('.body-im')
        body.classList.add('active')
        formBx.classList.add('active')
    }
    return (
        <div className="body-im">
            <div className="container1">
                <div className="blueBg">
                    <div className="box signin">
                        <h2>Already Have an Account?</h2>
                        <button className="signinBtn" onClick={signinBtn}>Sign in</button>
                    </div>
                    <div className="box signup">
                        <h2>Don't Have an Account?</h2>
                        <button className="signupBtn" onClick={signupBtn}>Sign up</button>
                    </div>
                </div>
                <div className="formBx">
                    <div className="form signinForm">
                        <form onSubmit={e => onSubmit2(e)}>
                            <h3>Sign In</h3>
                            <input type="text" type='email'
                                placeholder='Email *'
                                name='email2'
                                value={email2}
                                onChange={e => onChange2(e)}
                                required />
                            <input type="password" className='form-control'
                                type='password'
                                placeholder='Password *'
                                name='password2'
                                value={password2}
                                onChange={e => onChange2(e)}
                                minLength='6'
                                required />
                            <input type="submit" value="Login" />
                            <a className="forgot"><Link to='/rest_password'>Forgot Password</Link></a>
                        </form>
                    </div>
                    <div className="form signupForm">
                        <form onSubmit={e => onSubmit(e)}>
                            <h3>Sign Up</h3>

                            <input type="text"
                                placeholder="First Name *"
                                name='first_name'
                                value={first_name}
                                onChange={e => onChange(e)}
                                required />

                            <input type='text'
                                placeholder='Last Name*'
                                name='last_name'
                                value={last_name}
                                onChange={e => onChange(e)}
                                required />

                            <input type='email'
                                placeholder='Email *'
                                name='email'
                                value={email}
                                onChange={e => onChange(e)}
                                required />
                            <input type='password'
                                placeholder='Password *'
                                name='password'
                                value={password}
                                onChange={e => onChange(e)}
                                minLength='6'
                                required />
                            <input type='password'
                                placeholder='Confirm Password'
                                name='re_password'
                                value={re_password}
                                onChange={e => onChange(e)}
                                minLength='6'
                                required />
                            <input id="reg-btn" type="submit" value="Register" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { signup, login })(Signupv2);
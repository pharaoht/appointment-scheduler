import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { reset_password } from '../actions/auth';

const ResetPassword = ({ reset_password }) => {
    const [requestSent, setRequestSent] = useState(false)
    const [formData, setFormData] = useState({
        email: "",
    });

    const { email } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault()
        reset_password(email);
        setRequestSent(true)

    }

    if (requestSent) {
        return <Redirect to="/" />
    }

    return (
        <>
            <div className='container mt-5'>
                <h1>Solicitud para restablecer la contraseña</h1>
                <form onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                        <input
                            className='form-control'
                            type='email'
                            placeholder='correo electrónico *'
                            name='email'
                            value={email}
                            onChange={e => onChange(e)}
                            required
                        />
                    </div>
                    <br></br>
                    <button className='btn btn-primary' type='submit'>Restablecer la contraseña</button>
                </form>
            </div>
        </>
    )
};



export default connect(null, { reset_password })(ResetPassword);

//ctrl + D to select multiple keywords
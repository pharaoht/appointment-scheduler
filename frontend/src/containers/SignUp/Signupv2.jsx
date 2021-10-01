import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { signup, login } from '../../actions/auth';
import { BeatLoader } from 'react-spinners';
import './Signup.css'

const Signupv2 = ({ signup, isAuthenticated, login }) => {
    const [loader, setLoader] = useState(false)
    const [accountCreated, setAccountCreated] = useState(false)
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        re_password: "",
        is_staff: 0
    });

    useEffect(() => {
        setLoader(false)
        setAccountCreated(false)

    }, [accountCreated])

    const { first_name, last_name, email, password, re_password, is_staff } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault()

        if (password === re_password) {
            setLoader(true)
            await signup(email, first_name, last_name, password, re_password, is_staff)
            setAccountCreated(true)

        } else {
            alert("Las contraseñas no coinciden")
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
                        <h2>Ya Tienes una Cuenta?</h2>
                        <button className="signinBtn" onClick={signinBtn}>Iniciar Sesión</button>
                    </div>
                    <div className="box signup">
                        <h2>No Tiene una Cuenta?</h2>
                        <button className="signupBtn" onClick={signupBtn}>Registrarse</button>
                    </div>
                </div>
                <div className="formBx">
                    <div className="form signinForm">
                        <form onSubmit={e => onSubmit2(e)}>
                            <h3>Iniciar Sesión</h3>
                            <input type="text" type='email'
                                placeholder='Correo Electrónico  *'
                                name='email2'
                                value={email2}
                                onChange={e => onChange2(e)}

                                title="Por favor complete esto" />
                            <input type="password" className='form-control'
                                type='password'
                                placeholder='Contraseña *'
                                name='password2'
                                value={password2}
                                onChange={e => onChange2(e)}
                                minLength='6'
                                required
                                title="Por favor complete esto" />
                            <input type="submit" value="Iniciar Sesión" />
                            <a className="forgot"><Link to='/rest_password'>Has olvidado tu contraseña?</Link></a>
                        </form>
                    </div>
                    <div className="form signupForm">
                        <form onSubmit={e => onSubmit(e)}>
                            <h3>Registrarse</h3>

                            <input type="text"
                                placeholder="Nombre*"
                                name='first_name'
                                value={first_name}
                                onChange={e => onChange(e)}
                                required
                                title="Por favor complete esto" />

                            <input type='text'
                                placeholder='Apellido*'
                                name='last_name'
                                value={last_name}
                                onChange={e => onChange(e)}
                                required
                                title="Por favor complete esto" />

                            <input type='email'
                                placeholder='Correo Electrónico *'
                                name='email'
                                value={email}
                                onChange={e => onChange(e)}
                                required
                                title="Por favor complete esto" />
                            <input type='password'
                                placeholder='Constraseña *'
                                name='password'
                                value={password}
                                onChange={e => onChange(e)}
                                minLength='6'
                                required
                                title="Por favor complete esto" />
                            <input type='password'
                                placeholder='Confirmar Constraseña'
                                name='re_password'
                                value={re_password}
                                onChange={e => onChange(e)}
                                minLength='6'
                                required
                                title="Por favor complete esto" />
                            {loader ? <button id="reg-btn" type="submit"> <BeatLoader type="ThreeDots" color="#00BFFF" height={20} width={20} loading /></button> :
                                <input id="reg-btn" type="submit" value="Registrarse" />
                            }
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
import axios from 'axios';

import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    PASSWORD_REST_FAIL,
    PASSWORD_REST_SUCCESS,
    PASSWORD_REST_CONFIRM_FAIL,
    PASSWORD_REST_CONFIRM_SUCCESS,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
} from './types'

const url = 'http://localhost:8000/'

export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {

            const res = await axios.post(`${url}auth/jwt/verify`, body, config)

            if (res.data.code !== 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                })
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                })
            }
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            })
        }

    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }

}

export const load_user = () => async dispatch => {

    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }

        try {

            const res = await axios.get(`${url}auth/users/me/`, config)
            window.localStorage.setItem('info', res.data.id)

            dispatch({
                type: LOAD_USER_SUCCESS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: LOAD_USER_FAIL
            })
        }
    }
    else {
        dispatch({
            type: LOAD_USER_FAIL
        })
    }

};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${url}auth/jwt/create/`, body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })

        dispatch(load_user())
    } catch (err) {
        console.log(err.response.data)

        if (err.response.data) {
            if (err.response.data.email) {
                alert("El correo electr??nico no puede estar vac??o.")
            } else if (err.response.data.detail) {
                alert('No se encontr?? ninguna cuenta activa con esas credenciales. Si olvid?? su contrase??a, haga clic en "Olvid?? su contrase??a" para restablecer su contrase??a.')
            }

        }

        dispatch({
            type: LOGIN_FAIL
        })
    }
};

export const reset_password = (email) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        await axios.post(`http://localhost:8000/auth/users/reset_password/`, body, config)

        dispatch({
            type: PASSWORD_REST_SUCCESS
        });
    } catch (err) {
        dispatch({
            type: PASSWORD_REST_FAIL
        })
    }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    const csrf = axios.defaults.xsrfCookieName = 'csrftoken'
    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': csrf

        }
    }

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`${url}auth/users/reset_password_confirm/`, body, config)

        dispatch({
            type: PASSWORD_REST_CONFIRM_SUCCESS
        });
    } catch (err) {
        alert("Ocurri?? un error, int??ntelo de nuevo.")
        dispatch({
            type: PASSWORD_REST_CONFIRM_FAIL
        })
    }
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT,
    })
};

export const signup = (email, first_name, last_name, password, re_password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ email, first_name, last_name, password, re_password });

    try {
        const res = await axios.post(`${url}auth/users/`, body, config)
        alert('Por favor, revisa tu e-mail para activar tu cuenta.')

        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        })

    } catch (err) {
        if (err.response.data.email) {
            alert("Ya existe un usuario con este correo electr??nico")
        }
        if (err.response.data.password) {
            if (err.response.data.password[1]) {
                alert("Esta contrase??a es demasiado com??n. Pruebe con una contrase??a diferente con al menos 8 d??gitos y 1 letra")
            } else {
                alert("Su contrase??a debe tener al menos 8 d??gitos y no puede contener todos los n??meros.")
            }
        }
        dispatch({
            type: SIGNUP_FAIL
        })
    }
};

export const verify = (uid, token) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${url}auth/users/activation/`, body, config)

        dispatch({
            type: AUTHENTICATED_SUCCESS,
        })

    } catch (err) {
        dispatch({
            type: AUTHENTICATED_FAIL
        })
    }
};
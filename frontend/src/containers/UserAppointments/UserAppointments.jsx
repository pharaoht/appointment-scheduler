import React, { useState, useEffect } from "react";
import axios from "axios";
import './UserAppointments.css';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { load_user } from '../../actions/auth';
import { BeatLoader } from 'react-spinners';

const UserAppointments = ({ isAuthenticated, load_user }) => {
    const baseURL = 'http://localhost:8000/api/'
    const [pastApps, setPastApps] = useState([])
    const [futureApps, setFutureApps] = useState([])
    const [appDeleted, setAppDeleted] = useState(false)
    const [services, setServices] = useState([])
    const [loader, setLoader] = useState(false)
    const info = localStorage.getItem('info')

    useEffect(async () => {
        async function fetchData() {
            window.scrollTo(0, 0);
            await load_user();
            await getServices()
            getPastApps();
            getFutureApps();
            setAppDeleted(false)
        }
        fetchData();
    }, [isAuthenticated, appDeleted])

    const getServices = async () => {
        axios.get(`${baseURL}get-services/`)
            .then((res) => { setServices(res.data) })
            .catch((err) => console.log(err))
    }

    const getPastApps = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        const body = { client: info }

        axios.post(`${baseURL}get-user-appointments-past/`, body, config)
            .then(res => {
                setPastApps(res.data.results)

            }).catch(err => console.log(err))

    }

    const getFutureApps = async () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        const body = { client: info }

        axios.post(`${baseURL}get-user-appointments-future/`, body, config)
            .then(res => {
                setFutureApps(res.data.results)

            }).catch(err => console.log(err))

    }

    const deleteAppointment = (id) => {

        if (localStorage.getItem('access')) {
            if (window.confirm('Estás seguro de que deseas cancelar esta cita?')) {
                setLoader(true)
                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${localStorage.getItem('access')}`,
                        'Accept': 'application/json'
                    }
                };
                const body = { id: id, client: info }

                axios.post(`${baseURL}delete-appointment/`, body, config)
                    .then(res => {
                        alert("Su cita fue cancelada con éxito!")
                        setAppDeleted(true)
                        setLoader(false)

                    }).catch(err => {
                        console.log(err)
                        alert("No se pudo cancelar su cita. Inténtalo de nuevo.")
                        setLoader(false)
                    })
            } else {
                return null
            }
        }


    }

    function tConvert(time) {
        time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

        if (time.length > 1) { // If time format correct
            time = time.slice(1);  // Remove full string match value
            time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
            time[0] = +time[0] % 12 || 12; // Adjust hours
        }
        return time.join('');
    }



    if (!info) {
        return <Redirect to='/' />
    }

    return <>
        <div className="user-outline">
            <div className="holder-user-app">
                <div className="title-holder">
                    <h2>Tus Citas</h2>
                </div>
                <div className="user-app">
                    <div className="past-user-apps">
                        <h2>Citas Pasadas</h2>
                        <div>
                            <ul>
                                {pastApps.length ? pastApps.map((currentItem, idx) => {
                                    let name = ""
                                    if (currentItem.services.length > 1) {
                                        let num = currentItem.services.length - 1
                                        const n = num.toString()
                                        name = `${currentItem.services[0].name}, +${n}`
                                    } else {
                                        name = currentItem.services[0].name
                                    }
                                    return (
                                        <li key={idx}>

                                            <p>{name}</p>
                                            <p>{currentItem.appointment_date}</p>
                                            <p className="check-review"><Link to="/reviews"><i className="fa fa-check-circle" aria-hidden="true"></i></Link></p>
                                        </li>
                                    )
                                }) : <><h3>No Tienes Ninguna Citas</h3></>}
                            </ul>
                        </div>
                    </div>

                    <div className="upcom-user-apps">
                        <h2>Próximas Citas</h2>
                        <div>
                            <ul>
                                {futureApps.length ? futureApps.map((currentItem, i) => {
                                    let name = ""
                                    if (currentItem.services.length > 1) {
                                        let num = currentItem.services.length - 1
                                        const n = num.toString()
                                        name = `${currentItem.services[0].name} +${n}`
                                    } else {
                                        name = currentItem.services[0].name
                                    }
                                    return (
                                        <li key={i}>
                                            <p>{name}</p>
                                            <p>{currentItem.appointment_date}</p>
                                            <p id="up-app-time">{tConvert(currentItem.appointment_time.slice(0, 5))}</p>
                                            <p className="check-review">
                                                <i className="fa fa-trash" aria-hidden="true"
                                                    onClick={(e) => deleteAppointment(currentItem.id)}
                                                ></i>
                                            </p>
                                        </li>

                                    )
                                }) :
                                    <><h3>No Tienes Ninguna Citas</h3></>}
                                {loader ? <BeatLoader type="ThreeDots" color="#00BFFF" height={20} width={20} loading /> : null}

                            </ul>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </>
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})
export default connect(mapStateToProps, { load_user })(UserAppointments);
import React, { useState, useEffect } from "react";
import axios from "axios";
import './UserAppointments.css';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { load_user } from '../../actions/auth';

const UserAppointments = ({ isAuthenticated, load_user }) => {
    const baseURL = 'http://localhost:8000/api/'
    const [pastApps, setPastApps] = useState([])
    const [futureApps, setFutureApps] = useState([])
    const [appDeleted, setAppDeleted] = useState(false)
    const info = localStorage.getItem('info')

    useEffect(async () => {
        window.scrollTo(0, 0);
        await load_user();
        await getPastApps();
        await getFutureApps();
        setAppDeleted(false)

    }, [isAuthenticated, appDeleted])

    //user id bug on reload


    const getPastApps = () => {
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

    const getFutureApps = () => {
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

        if (window.confirm('Are you sure you wish to cancel this appointment?')) {
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
                    alert("Your Appointment was successfully canceled!")
                    setAppDeleted(true)

                }).catch(err => {
                    console.log(err)
                    alert("Your appointment could not be canceled. Please try again.")
                })
        } else {
            return null
        }


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
                                {pastApps.length ? pastApps.map((currentItem) => {
                                    return (
                                        <li>
                                            <p>{currentItem.service.name}</p>
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
                                {futureApps.length ? futureApps.map((currentItem) => {

                                    return (
                                        <li>

                                            <p>{currentItem.service.name}</p>
                                            <p>{currentItem.appointment_date}</p>
                                            <p>{currentItem.appointment_time.slice(0, 5)}</p>
                                            <p className="check-review">
                                                <i className="fa fa-trash" aria-hidden="true"
                                                    onClick={(e) => deleteAppointment(currentItem.id)}
                                                ></i>
                                            </p>
                                        </li>

                                    )
                                }) :
                                    <><h3>No Tienes Ninguna Citas</h3></>}
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
import React, { useState, useEffect } from "react";
import axios from "axios";
import './UserAppointments.css';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { load_user } from '../../actions/auth';

const UserAppointments = ({ isAuthenticated, user, load_user }) => {
    const baseURL = 'http://localhost:8000/api/'
    const [pastApps, setPastApps] = useState([])
    const [futureApps, setFutureApps] = useState([])




    useEffect(async () => {
        await load_user();
        await getPastApps();
        await getFutureApps();

    }, [isAuthenticated])



    const getPastApps = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        const body = { client: user.id }

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

        const body = { client: user.id }

        axios.post(`${baseURL}get-user-appointments-future/`, body, config)
            .then(res => {
                setFutureApps(res.data.results)

            }).catch(err => console.log(err))
    }

    if (!isAuthenticated) {
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
                                {console.log(pastApps)}
                                {pastApps ? pastApps.map((currentItem) => {
                                    return (
                                        <li>
                                            <p>{currentItem.service.name}</p>
                                            <p>{currentItem.appointment_date}</p>
                                            <p className="check-review"><i className="fa fa-check-circle" aria-hidden="true"></i></p>



                                        </li>

                                    )
                                }) : <><h3>You currently don't have any appointments</h3></>}
                            </ul>
                        </div>
                    </div>
                    <div className="upcom-user-apps">
                        <h2>Próximo Citas</h2>
                        <div>
                            <ul>
                                {console.log(pastApps)}
                                {futureApps ? futureApps.map((currentItem) => {
                                    return (
                                        <li>
                                            <p>{currentItem.service.name}</p>
                                            <p>{currentItem.appointment_date}</p>
                                            <p className="check-review"><i className="fa fa-trash" aria-hidden="true"></i></p>



                                        </li>

                                    )
                                }) : <><h3>You currently don't have any appointments</h3></>}
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
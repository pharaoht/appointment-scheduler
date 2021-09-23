import React, { useState, useEffect } from "react";
import axios from "axios";
import './UserAppointments.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const UserAppointments = ({ isAuthenticated, user }) => {
    const baseURL = 'http://localhost:8000/api/'
    const [pastApps, setPastApps] = useState([])
    const [futureApps, setFutureApps] = useState([])


    useEffect(() => {
        getPastApps();

    }, [])

    const getPastApps = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        const body = { client: user.id }
        console.log(body)

        axios.post(`${baseURL}get_user_appointments_past/`, body, config)
            .then(res => {
                setFutureApps(res.data)
            }).catch(err => console.log(err))

    }




    return <>
        <div className="user-outline">
            <div className="holder-user-app">
                <div className="title-holder">
                    <h2>Tus Citas</h2>
                </div>
                <div className="user-app">
                    <div className="past-user-apps">
                        <h2>Past appointments</h2>
                        <div>
                            past appointments here
                        </div>
                    </div>
                    <div className="upcom-user-apps">
                        <h2>Upcoming Appointments</h2>
                        <div>
                            future appointments here
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
export default connect(mapStateToProps, {})(UserAppointments);
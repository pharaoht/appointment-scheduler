import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { load_user } from '../../actions/auth';
import '../DayCare/DayCare.css'

const DayCare = ({ isAuthenticated, user, load_user }) => {
    const date = new Date();
    const URL = ''
    const [days, setDays] = useState(0)
    const [dateUpdate, setDateUpdate] = useState(new Date())
    const [formData, setFormData] = useState({
        client: "",
        animal: "",
        appointment_date: "",
        start_time: "",
        end_time: ""
    })

    const submitHandler = () => {
        if (isAuthenticated) {
            //do something
        }
    }

    const changeHandler = (e) => {

        if (isAuthenticated) {
            //do something
            setFormData({ ...formData, client: user.id, [e.target.name]: e.target.value })

        } else {
            return null;
        }

    }

    const updateDate = () => {
        setDateUpdate(prevState => new Date(Date.now() + days * 24 * 60 * 60 * 1000))
    }

    const incrementDate = () => {
        setDays(prevState => prevState + 1)
    };

    const decrementDate = () => {
        setDays(prevState => prevState - 1)
    };

    const timeZoneConvert = (datetoconvert) => {
        let yourDate = datetoconvert
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
        let dateNew = yourDate.toISOString().split('T')[0]
        return dateNew;
    }

    const postFUnction = () => {
        if (isAuthenticated) {
            //do something
        }
    }

    useEffect(() => {
        updateDate();
    }, [days])

    useEffect(() => {
        async function fetchData() {
            let dateNew = timeZoneConvert(dateUpdate);
            setFormData({ ...formData, appointment_date: dateNew });
        }

        fetchData();
    }, [dateUpdate])

    return <>
        <div id="outside-day">
            <div className="">
                <div>
                    <h2 id="daycare-title">Horas de Guardería</h2>
                </div>
                <div className="date-daycare-header">
                    <h3>
                        {dateUpdate < date ? null : <button className="arrow-btn" onClick={decrementDate}><i className="fa fa-arrow-circle-left" aria-hidden="true"></i></button>}
                        {dateUpdate.toLocaleDateString().slice(0, 10)}
                        <button className="arrow-btn" onClick={incrementDate}><i className="fa fa-arrow-circle-right" aria-hidden="true"></i></button>
                    </h3>
                </div>
                <form>
                    <div className="daycare-times">
                        <div className="daycare-hours">
                            <div>
                                <div>Desde las</div>
                                <select name="start_time" onChange={changeHandler}>
                                    <option value="08:00:00">8:00 AM</option>
                                    <option value="09:00:00">9:00 AM</option>
                                    <option value="10:00:00">10:00 AM</option>
                                    <option value="11:00:00">11:00 AM</option>
                                    <option value="12:00:00">12:00 PM</option>
                                    <option value="13:00:00">1:00 PM</option>
                                    <option value="14:00:00">2:00 PM</option>
                                    <option value="15:00:00">3:00 PM</option>
                                    <option value="16:00:00">4:00 PM</option>
                                </select>

                            </div>
                            <div>
                                <div>Hasta las</div>
                                <select name="end_time" onChange={changeHandler}>
                                    <option value="09:00:00">9:00 AM</option>
                                    <option value="10:00:00">10:00 AM</option>
                                    <option value="11:00:00">11:00 AM</option>
                                    <option value="12:00:00">12:00 PM</option>
                                    <option value="13:00:00">1:00 PM</option>
                                    <option value="14:00:00">2:00 PM</option>
                                    <option value="15:00:00">3:00 PM</option>
                                    <option value="16:00:00">4:00 PM</option>

                                </select>

                            </div>
                        </div>
                    </div>
                </form>

            </div>
        </div>
    </>
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})
export default connect(mapStateToProps, { load_user })(DayCare)



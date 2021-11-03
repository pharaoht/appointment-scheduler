import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { load_user } from '../../actions/auth';
import '../DayCare/DayCare.css'

const DayCare = ({ isAuthenticated, user, load_user }) => {

    const [formData, setFormData] = useState({
        client: "",
        animal: "",
        appointment_date: "",
        start_time: "",
        end_time: ""
    })

    const submitHandler = () => {

    }

    const changeHandler = () => {

    }

    return <>
        <div id="outside-day">
            <div className="">
                <h2 id="daycare-title">Horas de Guardería</h2>
                <div className="daycare-times">
                    <div className="daycare-hours">
                        <div>
                            <div>Desde las</div>
                            <select name="daycare_start_time">
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
                            <select name="daycare_end_time">
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
            </div>
        </div>
    </>
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})
export default connect(mapStateToProps, { load_user })(DayCare)



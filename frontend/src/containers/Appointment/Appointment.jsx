import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './appointment.css'

const Appointment = () => {
    const [today, setToday] = useState(new Date())
    const [refresh, setRefresh] = useState(false)
    const [formData, setFormData] = useState([])
    const baseURL = 'http://localhost:8000/api/'

    const submitHandler = () => {

    }

    const changeHandler = () => {

    }

    const increaseDate = () => {
        today.setDate(today.getDate() + 1);
        setRefresh(true)


    }

    const decreaseDate = () => {
        today.setDate(today.getDate() - 1);
        setRefresh(true)
    }

    const getAppointments = () => {
        let dateSearch = today.toISOString().slice(0, 10)

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ dateSearch });

        axios.post(`${baseURL}get-appointments/`, body, config)
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    useEffect(async () => {

        setRefresh(false)

        getAppointments()

        await axios.get('http://localhost:8000/api/get-services/')
            .then((res) => console.log(res))
            .catch((err) => console.log(err))




    }, [refresh])




    return <>
        <div className="paper">
            <div className="title-header">
                <h2>Book Appointment</h2>
            </div>
            <div className="form-holder">
                <div className="date-header">
                    <h3>
                        <button onClick={decreaseDate}><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></button>
                        {today.toISOString().slice(0, 10)}
                        <button onClick={increaseDate}><i class="fa fa-arrow-circle-right" aria-hidden="true"></i></button>
                    </h3>
                </div>
                <form className="form-info">
                    <div className="times-left">
                        <div className="time-holder">
                            <div className="times">
                                <input type="radio" name="1" value="08:00:00" onChange="" />
                                <label for="1">08:00</label>
                                <input type="radio" name="" value="08:30:00" onChange="" />
                                <label for="">08:30</label>
                            </div>
                        </div>
                    </div>
                    <div className="service-right">
                        service
                    </div>
                </form>
            </div>
        </div>
    </>
}

export default Appointment;




        // await axios.get('http://localhost:8000/api/get-appointments/')
        //     .then((res) => {
        //         console.log(res)
        //         res.data.map((currentItem, index) => {
        //             if (currentItem.appointment_date == today.toISOString().slice(0, 10)) {
        //                 console.log('match')
        //             }


        //         })
        //     })
        //     .catch((err) => console.log(err))
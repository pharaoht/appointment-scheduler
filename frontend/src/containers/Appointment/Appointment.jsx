import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './appointment.css'
import photo1 from '../../media/dognail.jpg'
const Appointment = () => {
    const date = new Date()
    const [today, setToday] = useState(new Date())
    const [refresh, setRefresh] = useState(false)
    const [formData, setFormData] = useState([])
    const [services, setServices] = useState([])
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
        let date = new Date()
        let dateSearch = today.toISOString().slice(0, 10)

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ dateSearch });

        axios.post(`${baseURL}get-appointments/`, body, config)
            .then((res) => {
                radioButtonFilter(res.data)
            })
            .catch((err) => console.log(err))
    }

    const radioButtonFilter = (data) => {
        let date = new Date()

        const element = document.getElementById('times')
        const labels = element.querySelectorAll('label')
        const radiobuttons = element.querySelectorAll('input[type=radio]')
        console.log(data)

        for (let i = 0; i < radiobuttons.length; i++) {
            labels[i].classList.remove('disabled')
            radiobuttons[i].classList.remove('disabled')
            data.map((currentItem, index) => {
                if (currentItem.appointment_time == radiobuttons[i].value) {
                    radiobuttons[i].disabled = true
                    radiobuttons[i].className = 'disabled'
                    labels[i].className = 'disabled'
                }
            })

            const curhours = date.getHours()
            const appTime = radiobuttons[i].value.split(":")

            if (today.toLocaleDateString() < date.toLocaleDateString()) {
                radiobuttons[i].className = 'disabled'
                labels[i].className = 'disabled'

            } else if (today.toLocaleDateString() === date.toLocaleDateString()) {
                console.log(today.toLocaleDateString())
                if (parseInt(appTime[0]) <= curhours) {
                    radiobuttons[i].className = 'disabled'
                    labels[i].className = 'disabled'
                }
            }

        }
    }

    const getServices = () => {
        axios.get(`${baseURL}get-services/`)
            .then((res) => { setServices(res.data) })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        setRefresh(false)
        getAppointments()
        getServices()


    }, [refresh])




    return <>
        <div id="outside">
            <div className="paper">
                <div className="title-header">
                    <h2>Book Appointment</h2>
                </div>
                <div className="form-holder">
                    <div className="date-header">
                        <h3>
                            {today.toLocaleDateString() < date.toLocaleDateString() ? null : <button onClick={decreaseDate}><i class="fa fa-arrow-circle-left" aria-hidden="true"></i></button>}
                            {today.toISOString().slice(0, 10)}
                            <button onClick={increaseDate}><i class="fa fa-arrow-circle-right" aria-hidden="true"></i></button>
                        </h3>
                    </div>
                    <form className="form-info">
                        <div className="times-left">
                            <div className="time-holder">
                                <div className="times" id="times">
                                    <div className="">
                                        <input type="radio" name="timeslot" value="08:00:00" id="1" />
                                        <label for="1">08:00</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="timeslot" value="08:30:00" id="2" />
                                        <label for="2">08:30</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="timeslot" value="09:00:00" id="3" />
                                        <label for="3">09:00</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="timeslot" value="09:30:00" id="4" />
                                        <label for="4">09:30</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="timeslot" value="10:00:00" id="5" />
                                        <label for="5">10:00</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="timeslot" value="10:30:00" id="6" />
                                        <label for="6">10:30</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="timeslot" value="11:00:00" id="7" />
                                        <label for="7">11:00</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="timeslot" value="11:30:00" id="8" />
                                        <label for="8">11:30</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="timeslot" value="12:00:00" id="9" />
                                        <label for="9">12:00</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="timeslot" value="12:30:00" id="10" />
                                        <label for="10">12:30</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="timeslot" value="13:00:00" id="11" />
                                        <label for="11">1:00</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="timeslot" value="13:30:00" id="12" />
                                        <label for="12">1:30</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="timeslot" value="14:00:00" id="13" />
                                        <label for="13">2:00</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="timeslot" value="14:30:00" id="14" />
                                        <label for="14">2:30</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="timeslot" value="15:00:00" id="15" />
                                        <label for="15">3:00</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="timeslot" value="15:30:00" id="16" />
                                        <label for="16">3:30</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="timeslot" value="16:00:00" id="17" />
                                        <label for="17">4:00</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="timeslot" value="16:30:00" id="18" />
                                        <label for="18">4:30</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="service-right">
                            <div className="services">
                                {services.map((currentItem, idx) => {
                                    return (
                                        <>
                                            <div className="cards" key={idx}>
                                                <div className="service-image">
                                                    <img src={`http://127.0.0.1:8000${currentItem.photo1}`} alt="" />
                                                </div>
                                                <h4>{currentItem.name}</h4>
                                                <hr></hr>
                                                <p className="card-text">{currentItem.desc}</p>
                                                <hr />
                                                <p>Price: ${currentItem.price}</p>
                                                <div className="check-service">
                                                    <input className="cbx" type="checkbox" name="" id={idx} />
                                                </div>

                                            </div>
                                        </>

                                    )
                                })}

                            </div>



                        </div>
                    </form>
                </div>
            </div>
        </div>
    </>
}

export default Appointment;

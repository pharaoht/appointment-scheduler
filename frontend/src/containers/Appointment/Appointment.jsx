import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './appointment.css'
import photo1 from '../../media/dognail.jpg'
import { connect } from 'react-redux';

const Appointment = ({ isAuthenticated, user }) => {
    const date = new Date()
    const [userData, setUserData] = useState([])
    const [today, setToday] = useState(date)
    const [refresh, setRefresh] = useState(false)
    const [formData, setFormData] = useState({
        client: "",
        service: "",
        animal: "",
        appointment_time: "",
        appointment_date: "",
    })
    const [services, setServices] = useState([])
    const [animals, setAnimals] = useState([])
    const baseURL = 'http://localhost:8000/api/'

    const submitHandler = (e) => {
        e.preventDefault()
        if (isAuthenticated) {
            if (formData.client == "" || formData.service == "" || formData.animal == "" || formData.appointment_date == "" || formData.appointment_time == "") {
                alert("Please make sure everything is filled out.")
            }
            else {
                postFunction()
            }
        }
        else {
            alert("You must be logged in to make an appointment")
            document.getElementById('toggle').click()
        }

    }

    const changeHandler = (e) => {
        if (user.id != null) {
            setFormData({
                ...formData,
                client: userData.id,
                [e.target.name]: e.target.value
            })
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        }

    }

    const increaseDate = () => {
        resetbuttons()
        today.setDate(today.getDate() + 1);
        setFormData({ ...formData, appointment_date: today.toISOString().slice(0, 10) })
        setRefresh(true)
    }

    const decreaseDate = () => {
        resetbuttons()
        today.setDate(today.getDate() - 1);
        setFormData({ ...formData, appointment_date: today.toISOString().slice(0, 10) })
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

        for (let i = 0; i < radiobuttons.length; i++) {
            labels[i].classList.remove('disabled')
            radiobuttons[i].classList.remove('disabled')
            radiobuttons[i].disabled = false
            data.map((currentItem, index) => {
                if (currentItem.appointment_date == today.toISOString().slice(0, 10)) {
                    if (currentItem.appointment_time == radiobuttons[i].value) {
                        radiobuttons[i].disabled = true
                        radiobuttons[i].className = 'disabled'
                        labels[i].className = 'disabled'
                    }
                }
            })

            console.log(today.toLocaleDateString() + " - " + date.toLocaleDateString())


            const curhours = date.getHours()
            const appTime = radiobuttons[i].value.split(":")

            if (today.toLocaleDateString() < date.toLocaleDateString()) {
                radiobuttons[i].className = 'disabled'
                labels[i].className = 'disabled'

            } else if (today.toLocaleDateString() === date.toLocaleDateString()) {

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

    const getAnimals = () => {
        axios.get(`${baseURL}get-animals/`)
            .then((res) => { setAnimals(res.data) })
            .catch(err => console.log(err))
    }

    const postFunction = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        axios.post(`${baseURL}create-appointment/`, formData, config)
            .then(res => {
                alert("You appointment has been created!")
                resetbuttons()
                setRefresh(true)
            })
            .catch(err => {
                console.log(err)
                resetbuttons()
                alert("Your appointment could not be created, please try again.")
            })
    }

    const cardHandler = (idx) => {
        const cbx = document.getElementById(`c${idx}`)
        if (cbx.checked) {
            cbx.checked = false
        } else {
            cbx.checked = true
        }

    }
    function resetbuttons() {
        const element = document.getElementById('times')
        const radiobuttons = element.querySelectorAll('input[type=radio]')
        for (let i = 0; i < radiobuttons.length; i++) {
            radiobuttons[i].checked = false
        }
    }

    useEffect(() => {
        setRefresh(false)
        getAppointments()
        getServices()
        getAnimals()
        setUserData(user)
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
                    <form className="form-info" onSubmit={submitHandler}>
                        <div className="times-left">
                            <div className="time-holder">
                                <div className="times" id="times">
                                    <div className="">
                                        <input type="radio" name="appointment_time" value="08:00:00" id="1" onChange={changeHandler} />
                                        <label for="1">08:00</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="appointment_time" value="08:30:00" id="2" onChange={changeHandler} />
                                        <label for="2">08:30</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="appointment_time" value="09:00:00" id="3" onChange={changeHandler} />
                                        <label for="3">09:00</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="appointment_time" value="09:30:00" id="4" onChange={changeHandler} />
                                        <label for="4">09:30</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="appointment_time" value="10:00:00" id="5" onChange={changeHandler} />
                                        <label for="5">10:00</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="appointment_time" value="10:30:00" id="6" onChange={changeHandler} />
                                        <label for="6">10:30</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="appointment_time" value="11:00:00" id="7" onChange={changeHandler} />
                                        <label for="7">11:00</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="appointment_time" value="11:30:00" id="8" onChange={changeHandler} />
                                        <label for="8">11:30</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="appointment_time" value="12:00:00" id="9" onChange={changeHandler} />
                                        <label for="9">12:00</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="appointment_time" value="12:30:00" id="10" onChange={changeHandler} />
                                        <label for="10">12:30</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="appointment_time" value="13:00:00" id="11" onChange={changeHandler} />
                                        <label for="11">1:00</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="appointment_time" value="13:30:00" id="12" onChange={changeHandler} />
                                        <label for="12">1:30</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="appointment_time" value="14:00:00" id="13" onChange={changeHandler} />
                                        <label for="13">2:00</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="appointment_time" value="14:30:00" id="14" onChange={changeHandler} />
                                        <label for="14">2:30</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="appointment_time" value="15:00:00" id="15" onChange={changeHandler} />
                                        <label for="15">3:00</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="appointment_time" value="15:30:00" id="16" onChange={changeHandler} />
                                        <label for="16">3:30</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="appointment_time" value="16:00:00" id="17" onChange={changeHandler} />
                                        <label for="17">4:00</label>
                                    </div>
                                    <div className="">
                                        <input type="radio" name="appointment_time" value="16:30:00" id="18" onChange={changeHandler} />
                                        <label for="18">4:30</label>
                                    </div>
                                </div>
                            </div>
                            <div style={{ outline: '1px solid black' }}>
                                <div>
                                    {animals.map((currentItem, idx) => {
                                        return (
                                            <>
                                                <div>
                                                    <input type="radio" name="animal" id={`a${idx}`} value={currentItem.id} onChange={changeHandler} />
                                                    <label for={`a${idx}`}>{currentItem.name}</label>
                                                </div>
                                            </>
                                        )
                                    })}
                                    <div>
                                        <button type="submit">Schedule</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="service-right">
                            <div className="services">
                                {services.map((currentItem, idx) => {
                                    return (
                                        <>
                                            <div className="cards" key={idx} onClick={(e) => cardHandler(idx)}>
                                                <div className="service-image">
                                                    <img src={`http://127.0.0.1:8000${currentItem.photo1}`} alt="" />
                                                </div>
                                                <h4>{currentItem.name}</h4>
                                                <hr></hr>
                                                <p className="card-text">{currentItem.desc}</p>
                                                <hr />
                                                <p>Price: ${currentItem.price}</p>
                                                <div className="check-service">
                                                    <input className="cbx" type="checkbox" name="service" id={`c${idx}`} value={currentItem.id} onChange={changeHandler} />
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

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})
export default connect(mapStateToProps, {})(Appointment);

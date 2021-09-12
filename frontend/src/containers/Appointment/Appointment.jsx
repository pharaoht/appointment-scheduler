import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './appointment.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';



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
        appointment_date: today,
    })
    const [services, setServices] = useState([])
    const [animals, setAnimals] = useState([])
    const baseURL = 'http://localhost:8000/api/'

    const submitHandler = (e) => {
        e.preventDefault()
        if (isAuthenticated) {
            if (formData.client === "" || formData.service === "" || formData.animal === "" || formData.appointment_date === "" || formData.appointment_time === "") {
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
        if (isAuthenticated) {
            if (e.target.type === 'checkbox') {
                if (e.target.checked) setFormData({ ...formData, [e.target.name]: e.target.value })
                else setFormData({ ...formData, [e.target.name]: "" })
            }
            else {
                setFormData({ ...formData, client: userData.id, [e.target.name]: e.target.value })
            }

        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value })
        }

    }

    const increaseDate = () => {
        console.log(setToday())
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
        let dateSearch = today.toISOString().slice(0, 10)

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const body = JSON.stringify({ dateSearch });

        axios.post(`${baseURL}get-appointments/`, body, config)
            .then((res) => {
                console.log(res)
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
                if (currentItem.appointment_date === today.toISOString().slice(0, 10)) {
                    if (currentItem.appointment_time === radiobuttons[i].value) {
                        radiobuttons[i].disabled = true
                        radiobuttons[i].className = 'disabled'
                        labels[i].className = 'disabled'
                    }
                }
                return null
            })

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

    const cardHandler = (e, idx) => {
        const cbx = document.getElementById(idx)
        const tab = document.getElementById(`tab${idx}`)
        if (e.target.type == 'checkbox') {
            if (cbx.checked) {
                tab.style.border = 'solid 3px blue'
                tab.style.borderRadius = '5px'

            } else {
                tab.style.border = 'none'
                tab.style.borderRadius = '0px'
            }
        } else if (e.target.nodeName === "DIV") {
            if (cbx.checked) {
                cbx.checked = false
                tab.style.border = 'none'
                tab.style.borderRadius = '0px'

            } else {

                cbx.checked = true
                tab.style.border = 'solid 3px blue'
                tab.style.borderRadius = '5px'
            }

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
                    <h2 id="header-app">Book Appointment</h2>
                </div>
                <div className="form-holder">
                    <div className="date-header">
                        <h3>
                            {today.toLocaleDateString() < date.toLocaleDateString() ? null : <button onClick={decreaseDate}><i className="fa fa-arrow-circle-left" aria-hidden="true"></i></button>}
                            {today.toISOString().slice(0, 10)}
                            <button onClick={increaseDate}><i className="fa fa-arrow-circle-right" aria-hidden="true"></i></button>
                        </h3>
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className="form-info">
                            <div className="times-left">
                                <div className="time-holder">
                                    <div className="times" id="times">
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="08:00:00" id="1r" onChange={changeHandler} />
                                            <label for="1r">08:00</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="08:30:00" id="2r" onChange={changeHandler} />
                                            <label for="2r">08:30</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="09:00:00" id="3r" onChange={changeHandler} />
                                            <label for="3r">09:00</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="09:30:00" id="4r" onChange={changeHandler} />
                                            <label for="4r">09:30</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="10:00:00" id="5r" onChange={changeHandler} />
                                            <label for="5r">10:00</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="10:30:00" id="6r" onChange={changeHandler} />
                                            <label for="6r">10:30</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="11:00:00" id="7r" onChange={changeHandler} />
                                            <label for="7r">11:00</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="11:30:00" id="8r" onChange={changeHandler} />
                                            <label for="8r">11:30</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="12:00:00" id="9r" onChange={changeHandler} />
                                            <label for="9r">12:00</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="12:30:00" id="10r" onChange={changeHandler} />
                                            <label for="10r">12:30</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="13:00:00" id="11r" onChange={changeHandler} />
                                            <label for="11r">1:00</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="13:30:00" id="12r" onChange={changeHandler} />
                                            <label for="12r">1:30</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="14:00:00" id="13r" onChange={changeHandler} />
                                            <label for="13r">2:00</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="14:30:00" id="14r" onChange={changeHandler} />
                                            <label for="14r">2:30</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="15:00:00" id="15r" onChange={changeHandler} />
                                            <label for="15r">3:00</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="15:30:00" id="16r" onChange={changeHandler} />
                                            <label for="16r">3:30</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="16:00:00" id="17r" onChange={changeHandler} />
                                            <label for="17r">4:00</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="16:30:00" id="18r" onChange={changeHandler} />
                                            <label for="18r">4:30</label>
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>
                                <div>
                                    <div className="animal-type-holder">
                                        {animals.map((currentItem, idx) => {
                                            return (
                                                <>
                                                    <div>
                                                        <label>
                                                            <input type="radio" name="animal" id={`a${idx}`} value={currentItem.id} onChange={changeHandler} />
                                                            <span for={`a${idx}`}>{currentItem.name}</span>
                                                        </label>
                                                    </div>

                                                </>
                                            )
                                        })}
                                    </div>
                                </div>

                            </div>
                            <div className="service-right">
                                <div className="services" id="services-app">
                                    {services.map((currentItem, idx) => {
                                        return (
                                            <>
                                                {/* {onClick = {(e) => cardHandler(e, idx)} } */}
                                                <div className="service" key={idx} id={`tab${idx}`} onClick={(e) => cardHandler(e, idx)}>
                                                    <div className="service-tab" >
                                                        <div>{currentItem.name} - ${currentItem.price}</div>
                                                        <div className="more-info-holder"><i className="more-info-service"><Link to="/services">more-info</Link></i></div>
                                                    </div>
                                                    <div className="service-input">
                                                        <input className="cbx" type="checkbox" name="service" id={idx} value={currentItem.id} onChange={changeHandler} />
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="submit-button">
                            <button type="submit">Schedule <i class="fa fa-paw" aria-hidden="true"></i> </button>
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


{/* <div>
    <input type="radio" name="animal" id={`a${idx}`} value={currentItem.id} onChange={changeHandler} />
    <label for={`a${idx}`}>{currentItem.name}</label>
</div > */}
import React, { useState, useEffect, } from 'react';
import axios from 'axios'
import './appointment.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { } from 'react-loader-spinner';



const Appointment = ({ isAuthenticated, user }) => {
    const date = new Date()
    const [userData, setUserData] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [dateUpdate, setDateUpdate] = useState(new Date())
    const [formData, setFormData] = useState({
        client: "",
        service: "",
        animal: "",
        appointment_time: "",
        appointment_date: dateUpdate.toLocaleDateString().slice(0, 10),
    })
    const [services, setServices] = useState([])
    const [animals, setAnimals] = useState([])
    const baseURL = 'http://localhost:8000/api/'
    const [days, setDays] = useState(0)

    const submitHandler = (e) => {
        e.preventDefault()
        if (isAuthenticated) {
            if (formData.client === "" || formData.service === "" || formData.animal === "" || formData.appointment_date === "" || formData.appointment_time === "") {
                alert("Asegúrese de ingresar la fecha, la hora y el tipo de mascota.")
            }
            else {
                postFunction()
            }
        }
        else {
            alert("Debe iniciar sesión para hacer una cita.")
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
            return null
        }

    }

    const incrementDate = (() => {
        setDays(prevState => prevState + 1)

    })

    const decrementDate = (() => {
        setDays(prevState => prevState - 1)


    })

    const updateDate = () => {
        setDateUpdate(prevState => new Date(Date.now() + days * 24 * 60 * 60 * 1000))
    }

    function getAppointments() {
        let dateSearch = dateUpdate.toISOString().slice(0, 10)

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
                if (currentItem.appointment_date === dateUpdate.toISOString().slice(0, 10)) {
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


            if (dateUpdate.toLocaleDateString() === date.toLocaleDateString()) {

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
                alert("Tu cita ha sido creada! ✔️")
                resetbuttons()
                setRefresh(true)
            })
            .catch(err => {
                console.log(err)
                resetbuttons()
                alert("No se pudo crear su cita. Vuelva a intentarlo. ❌")
            })
    }

    const cardHandler = (e, idx) => {
        const cbx = document.getElementById(idx)
        const tab = document.getElementById(`tab${idx}`)
        console.log(cbx)
        if (e.target.type === 'checkbox') {
            if (cbx.checked) {
                tab.style.border = 'solid 3px blue'
                tab.style.borderRadius = '5px'

            } else {
                tab.style.border = 'none'
                tab.style.borderRadius = '0px'
            }
        } else if (e.target.nodeName === "DIV") {
            if (cbx.checked) {
                setFormData({ ...formData, [cbx.name]: "" })
                cbx.checked = false
                tab.style.border = 'none'
                tab.style.borderRadius = '0px'


            } else {
                setFormData({ ...formData, [cbx.name]: cbx.value })
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
        updateDate()
    }, [days])

    useEffect(() => {
        window.scrollTo(0, 0);
        setRefresh(false)
        getAppointments()
        getServices()
        getAnimals()
        let yourDate = dateUpdate
        const offset = yourDate.getTimezoneOffset()
        yourDate = new Date(yourDate.getTime() - (offset * 60 * 1000))
        let dateNew = yourDate.toISOString().split('T')[0]
        setFormData({ ...formData, appointment_date: dateNew })
        setUserData(user)
    }, [dateUpdate, refresh])


    return <>
        <div id="outside">
            <div className="paper">
                <div className="title-header">
                    <h2 id="header-app">Reservar Citas</h2>
                </div>
                <div className="form-holder">
                    <div className="date-header">
                        <h3>
                            {dateUpdate < date ? null : <button className="arrow-btn" onClick={decrementDate}><i className="fa fa-arrow-circle-left" aria-hidden="true"></i></button>}
                            {dateUpdate.toLocaleDateString().slice(0, 10)}
                            <button className="arrow-btn" onClick={incrementDate}><i className="fa fa-arrow-circle-right" aria-hidden="true"></i></button>
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
                                            <input type="radio" name="appointment_time" value="09:00:00" id="3r" onChange={changeHandler} />
                                            <label for="3r">09:00</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="10:00:00" id="5r" onChange={changeHandler} />
                                            <label for="5r">10:00</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="11:00:00" id="7r" onChange={changeHandler} />
                                            <label for="7r">11:00</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="12:00:00" id="9r" onChange={changeHandler} />
                                            <label for="9r">12:00</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="13:00:00" id="11r" onChange={changeHandler} />
                                            <label for="11r">1:00</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="14:00:00" id="13r" onChange={changeHandler} />
                                            <label for="13r">2:00</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="15:00:00" id="15r" onChange={changeHandler} />
                                            <label for="15r">3:00</label>
                                        </div>
                                        <div className="">
                                            <input type="radio" name="appointment_time" value="16:00:00" id="17r" onChange={changeHandler} />
                                            <label for="17r">4:00</label>
                                        </div>
                                    </div>
                                </div>
                                <hr></hr>
                                <div>
                                    <div className="animal-type-holder">
                                        {animals.map((currentItem, idx) => {
                                            return (
                                                <>
                                                    <div key={idx}>
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
                            <button type="submit">Reserva <i class="fa fa-paw" aria-hidden="true"></i> </button>
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
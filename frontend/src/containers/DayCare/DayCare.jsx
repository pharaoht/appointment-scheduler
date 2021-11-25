import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { load_user } from '../../actions/auth';
import '../DayCare/DayCare.css'

const DayCare = ({ isAuthenticated, user, load_user }) => {
    const date = new Date();
    const [loader, setLoader] = useState(false)
    const baseURL = 'http://localhost:8000/api/'
    const [days, setDays] = useState(0)
    const [dateUpdate, setDateUpdate] = useState(new Date())
    const [animals, setAnimals] = useState([])
    const [formData, setFormData] = useState({
        client: "",
        animal: "",
        appointment_date: "",
        start_time: "",
        end_time: ""
    })

    const submitHandler = (e) => {
        e.preventDefault();
        if (isAuthenticated) {
            //do something
            if (formData.animal === "" || formData.appointment_date === "" || formData.start_time === "" || formData.end_time === "") {

                alert("please fill everything out.");
                return false;
            } else {

                postFunction();
            }
        } else {
            alert("Debes iniciar sesión para hacer una cita")
            document.getElementById('toggle').click();
            return false;
        }
    }

    const changeHandler = (e) => {

        if (isAuthenticated) {
            if (document.getElementById("start").value !== '') {
                postTimeCheck();
            } else {
                removeDisabled();
            }
            //do something
            setFormData({ ...formData, client: user.id, [e.target.name]: e.target.value })
        } else {
            return null;
        }

    }

    const getAnimals = () => {
        axios.get(`${baseURL}get-animals/`)
            .then((res) => { setAnimals(res.data) })
            .catch(err => console.log(err))
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

    const postFunction = () => {
        setLoader(true);

        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };

        axios.post(`${baseURL}create-daycare-appointment/`, formData, config)
            .then(res => {
                alert("Tu cita ha sido creada! ✔️");
                setLoader(false);
            }).catch(err => {
                if (err.response.data.errors) {
                    alert(err.response.data.errors)
                } else {
                    alert("No se pudo crear su cita. Vuelva a intentarlo. ❌");
                }
                setLoader(false);
            });
    }

    const timeChecker = (date) => {
        let arriveTimes = document.getElementsByClassName("arrive-time");
        let endTimes = document.getElementsByClassName("pickup-time");
        let now = new Date()
        let now1 = now.toLocaleString('en-US', { hour: 'numeric', hour12: false })
        document.getElementById("start").selectedIndex = 0;
        document.getElementById("end").selectedIndex = 0;
        document.getElementById("pet-dc").selectedIndex = 0;
        setFormData({ ...formData, start_time: '', appointment_date: date, animal: '', end_time: '' })

        if (dateUpdate < now) {
            for (let key of arriveTimes) {
                let startTime = key.value.split(":");

                if (startTime[0] <= now1) {
                    key.setAttribute("disabled", true)
                    key.classList.add("none")
                } else {
                    key.removeAttribute("disabled")
                    key.classList.remove("none")
                }
            }

            for (let key2 of endTimes) {
                let endTime = key2.value.split(":");

                if (endTime[0] <= now1) {
                    key2.setAttribute("disabled", true);
                    key2.classList.add("none");
                } else {
                    key2.removeAttribute("disabled")
                    key2.classList.remove("none")
                }
            }
        } else {
            for (let key1 of arriveTimes) {
                key1.removeAttribute("disabled")
                key1.classList.remove("none")
            }

            for (let key2 of endTimes) {
                key2.removeAttribute("disabled")
                key2.classList.remove("none")
            }
        }
    }

    const postTimeCheck = () => {
        let pickupTimes = document.getElementsByClassName("pickup-time");
        let start = document.getElementById("start").value

        for (let key of pickupTimes) {
            if (key.value <= start) {
                key.setAttribute("disabled", true)
                key.classList.add("none")
            } else {
                key.removeAttribute("disabled")
                key.classList.remove("none")
            }
        }
    }

    const removeDisabled = () => {
        let pickupTimes = document.getElementsByClassName("pickup-time");
        for (let key of pickupTimes) {
            key.removeAttribute("disabled")
            key.classList.remove("none")
        }
    }

    useEffect(() => {
        updateDate();
    }, [days])

    useEffect(() => {
        async function fetchData() {
            let dateNew = timeZoneConvert(dateUpdate);
            getAnimals();
            timeChecker(dateNew);
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
                <form onSubmit={submitHandler}>
                    <div className="daycare-times">
                        <h4>En Patitas Limpias, puedes dejar a tu mascota en nuestra guardería. Nosotros velaremos por ellos y nos ocuparemos de ellos mientras tú te ocupas de tus recados. El precio comienza en $ 3.000 por hora.</h4>
                        <div className="daycare-hours">
                            <div className="client-time">
                                <div className='client-re'>Cuándo llegarás</div>
                                <select id="start" name="start_time" onChange={changeHandler}>
                                    <option className="" value="" selected >Escoge la hora</option>
                                    <option className="arrive-time" value="08:00:00">8:00 AM</option>
                                    <option className="arrive-time" value="09:00:00">9:00 AM</option>
                                    <option className="arrive-time" value="10:00:00">10:00 AM</option>
                                    <option className="arrive-time" value="11:00:00">11:00 AM</option>
                                    <option className="arrive-time" value="12:00:00">12:00 PM</option>
                                    <option className="arrive-time" value="13:00:00">1:00 PM</option>
                                    <option className="arrive-time" value="14:00:00">2:00 PM</option>
                                    <option className="arrive-time" value="15:00:00">3:00 PM</option>
                                    <option className="arrive-time" value="16:00:00">4:00 PM</option>
                                </select>
                            </div>
                            <div className='client-time'>
                                <div className='client-re'>Cuándo regresarás</div>
                                <select id="end" name="end_time" onChange={changeHandler}>
                                    <option className="" value="" selected >Escoge la hora</option>
                                    <option className="pickup-time" value="09:00:00">9:00 AM</option>
                                    <option className="pickup-time" value="10:00:00">10:00 AM</option>
                                    <option className="pickup-time" value="11:00:00">11:00 AM</option>
                                    <option className="pickup-time" value="12:00:00">12:00 PM</option>
                                    <option className="pickup-time" value="13:00:00">1:00 PM</option>
                                    <option className="pickup-time" value="14:00:00">2:00 PM</option>
                                    <option className="pickup-time" value="15:00:00">3:00 PM</option>
                                    <option className="pickup-time" value="16:00:00">4:00 PM</option>
                                    <option className="pickup-time" value="17:00:00">5:00 PM</option>
                                </select>
                            </div>
                            <div className='client-time'>
                                <div className='client-re'>Mascota</div>
                                <select id="pet-dc" name="animal" onChange={changeHandler}>
                                    <option className="" value="" selected >Escoge...</option>
                                    {animals.map((item) => {
                                        return (
                                            <>
                                                <option value={item.id}>{item.name}</option>
                                            </>
                                        )
                                    })}
                                </select>
                            </div>
                        </div>
                        <div className="submit-button">
                            {loader ? <button type="submit" ><BeatLoader type="ThreeDots" color="#00BFFF" height={20} width={20} loading /></button>
                                : <button type="submit">Reserva <i class="fa fa-paw" aria-hidden="true"></i> </button>}
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



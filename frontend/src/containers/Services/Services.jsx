import React, { useEffect, useState } from 'react';
import axios from 'axios'
import './Services.css'
import { Link } from 'react-router-dom';

const Services = () => {

    const baseURL = 'http://localhost:8000/api/'
    const [services, setServices] = useState([])
    useEffect(() => {
        getServices()
        window.scrollTo(0, 0);
    }, [])

    const getServices = () => {
        axios.get(`${baseURL}get-services/`)
            .then((res) => { setServices(res.data) })
            .catch((err) => console.log(err))
    }

    return <>
        <div className="services-outline">
            <div className="service">
                <h2 className="text-reflect">Servicios</h2>
                <div className="service-holder">
                    {services.map((currentItem, idx) => {
                        return (
                            <>
                                <div className="service-item">
                                    <div className="img-service">
                                        <img className="img" src={`http://127.0.0.1:8000${currentItem.photo1}`} alt="photo" />
                                    </div>
                                    <div className="detail-service">
                                        <h4>{currentItem.name}</h4>
                                        <div className="service-info">
                                            <p>{currentItem.desc}</p>
                                            <div className="service-price">
                                                <div className="price">${currentItem.price}</div>
                                                <div><Link to="/appointments"><button id="service-btn">Calendario <i class="fa fa-paw" aria-hidden="true"></i> </button> </Link></div>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </>
                        )
                    })}
                </div>
            </div>
        </div>
    </>
}

export default Services;
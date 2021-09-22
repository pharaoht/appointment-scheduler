import React from 'react';
import './AboutUs.css'
import photo1 from '../../media/Bubbles_HD.png'

const About = () => {
    return <>
        <div className="body-about-us">
            <section>
                <div className="container">
                    <div className="contactInfo">
                        <div>
                            <h2 className="about-us-text">Contact Info</h2>
                            <ul className="info">
                                <li>
                                    <span><i className="fa fa-map-marker" aria-hidden="true"></i></span>
                                    <span className="about-us-text"><a href="https://goo.gl/maps/62dX1Jy1YFqKF2mM8" target="_blank">Cra 60 d bis #97-08, Bogotá, Colombia</a></span>
                                </li>
                                <li>
                                    <span><i className="fa fa-envelope" aria-hidden="true"></i></span>
                                    <span className="about-us-text">patitaslimpias2@gmail.com</span>
                                </li>
                                <li>
                                    <span><i className="fa fa-whatsapp" aria-hidden="true"></i></span>
                                    <span className="about-us-text">+57 304-5598794</span>
                                </li>
                            </ul>
                        </div>

                        <ul className="sci">
                            <li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                            <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                            <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                            <li><a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
                        </ul>

                    </div>
                    <div className="contactForm">
                        <div className="holder-info">
                            <div className="desc-holder">
                                <div className="des">
                                    <p className="about-us-text">Somos una empresa dedicada al cuidado de tu mejor amigo peludito, prestamos el servicio de peluquería,  baño , spa , Pet Shop, guardería diurna , y mucho más,  trabajamos con amor y dedicación para el bienestar y alegría de tu mejor amigo 🐶🐱🐾</p>
                                </div>
                                <hr></hr>

                            </div>

                            <div className="img-info-holder">
                                <div className="img-holder">
                                    <img src={photo1} alt="image" />
                                </div>
                                <div className="info-holder">
                                    <p className="about-us-text">Alejandra Castillo</p>
                                    <p className="about-us-text">Owner of</p>
                                    <p className="about-us-text">Patitas Limpias</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </div>
    </>
}

export default About;
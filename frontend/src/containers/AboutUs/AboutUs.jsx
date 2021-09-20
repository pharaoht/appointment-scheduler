import React from 'react';
import './AboutUs.css'


const About = () => {
    return <>
        <div className="body">
            <section>
                <div className="container">
                    <div className="contactinfo">
                        <div>
                            <h2>Contact Info</h2>
                            <ul className="info">
                                <li>
                                    <span><i class="fa fa-map-marker" aria-hidden="true"></i></span>
                                    <span>Cra 65#103-91, Bogotá, Colombia</span>
                                </li>
                                <li>
                                    <span><i class="fa fa-envelope" aria-hidden="true"></i></span>
                                    <span>lorem@lorem.com</span>
                                </li>
                                <li>
                                    <span><i class="fa fa-phone" aria-hidden="true"></i></span>
                                    <span>999-999-9999</span>
                                </li>
                            </ul>
                            <ul className="sci">
                                <li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                                <li><a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="contactForm">
                        about us info
                    </div>


                </div>
            </section>
        </div>
    </>
}

export default About;
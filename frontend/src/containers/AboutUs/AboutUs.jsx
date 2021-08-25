import React from 'react';
import './AboutUs.css'
import photo1 from '../../media/dognail.jpg'
const About = () => {
    return <>
        <div className="body">
            <div className="card">
                <div className="card-image" style={{ backgroundImage: `url(${photo1})` }} ></div>
                <div className="card-text">
                    <h2>Nail Filling Service</h2>
                    <p>Price: 12.000</p>
                    <p>Description: </p>
                </div>
                <div className="card-stats"> </div>
            </div>
        </div>
    </>
}

export default About;
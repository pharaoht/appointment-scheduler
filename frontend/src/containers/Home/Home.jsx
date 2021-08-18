import React from 'react'
import { Link } from 'react-router-dom';
import './Home.css'
import photo1 from '../../media/dognail.jpg'
import photo2 from '../../media/dogsaloon.jpg'
import photo3 from '../../media/dogwash.jpg'

const Home = () => (
    <div className="page-layout">
        <div className="banner">
            <div className='content'>
                <h1>Bienvenida a Patitas Limpias</h1>
                <p>Desplácese hacia abajo para darle a su perro el día siguiente en el spa</p>
            </div>


        </div>
        <section className="sec" id="about">
            <div className="content2">
                <div className="mxw800p">
                    <h3>Who we are</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ut porttitor leo a diam sollicitudin. Et leo duis ut diam quam nulla porttitor massa id.</p>
                    <Link to='/about-us' className="btn">Read More</Link>
                </div>

            </div>
        </section>
        <hr></hr>
        <section className="sec" id="services">
            <div className="content2">
                <div className="mxw800p">
                    <h3>What we offer</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ut porttitor leo a diam sollicitudin. Et leo duis ut diam quam nulla porttitor massa id.</p>
                    <a href="#" className="btn">See Pricing</a>
                </div>
                <div className="services">
                    <div className="box">
                        <div className="iconBx">
                            <img src={photo1} alt="image" />
                        </div>
                        <div>
                            <h2>Service 1</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, Aliquam ut porttitor leo a diam sollicitudin. Et leo duis ut diam quam nulla porttitor massa id.</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="iconBx">
                            <img src={photo2} alt="image" />
                        </div>
                        <div>
                            <h2>Service 2</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, Aliquam ut porttitor leo a diam sollicitudin. Et leo duis ut diam quam nulla porttitor massa id.</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="iconBx">
                            <img src={photo3} alt="image" />
                        </div>
                        <div>
                            <h2>Service 3</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, Aliquam ut porttitor leo a diam sollicitudin. Et leo duis ut diam quam nulla porttitor massa id.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="sec stats" id="appointments">
            <div className="content2">
                <div className="mxw800p">
                    <h3>Appointments</h3>
                    <Link to="/about-us" className="btn">Schedule Today!</Link>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, Aliquam ut porttitor leo a diam sollicitudin. Et leo duis ut diam quam nulla porttitor massa id.</p>
                </div>

            </div>
        </section>
        <section className="sec" id="about">
            <div className="content2">
                <div className="mxw800p">
                    <h3>Who we are</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam ut porttitor leo a diam sollicitudin. Et leo duis ut diam quam nulla porttitor massa id.</p>
                    <Link to='/about-us' className="btn">Read More</Link>
                </div>

            </div>
        </section>
    </div>
)

export default Home;

{/* <div className="paper">
    <p>Home Page</p>
    <p>Click here to login</p>
    <Link to="/login">Login</Link>

</div> */}
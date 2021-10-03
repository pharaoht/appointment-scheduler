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
                    <h3>Quienes Somos</h3>
                    <p>Nuestro objetivo es brindar un excelente cuidado de mascotas a un precio muy razonable. Debido a que los perros son parte de la familia de cada hogar, merecen el mejor tratamiento disponible. Mantenemos un ambiente seguro y amigable para los perros que asegura a nuestros clientes que sus mascotas están en buenas manos cuando las dejan en nuestro salón.</p>
                    <Link to='/about-us' className="btn">Lee Màs.</Link>
                </div>

            </div>
        </section>
        <hr></hr>
        <section className="sec" id="services">
            <div className="content2">
                <div className="mxw800p">
                    <h3>Qué Ofrecemos</h3>
                    <p>Ofrecemos servicios que atenderán a su mascota y la harán sentir como en casa. ¡Todas las mascotas merecen tener un día de spa y tú te mereces una mascota feliz, limpia y agradable! ¡Tu mascota no solo nos dejará limpios, sino que también nos dejará felices!</p>
                    <a href="#" className="btn">Ver Precios</a>
                </div>
                <div className="services">
                    <div className="box">
                        <div className="iconBx">
                            <img src={photo2} alt="image" />
                        </div>
                        <div>
                            <h2>Peluquería</h2>
                            <p>Corte según la raza y el gusto del cliente</p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="iconBx">
                            <img src={photo3} alt="image" />
                        </div>
                        <div>
                            <h2>Baño</h2>
                            <p>Espumoso baño para tu mascota,  el baño incluye : limpieza de dientes , limpieza de oídos , corte y limado de uñas , glándulas paranales  (si así se desea) </p>
                        </div>
                    </div>
                    <div className="box">
                        <div className="iconBx">
                            <img src={photo1} alt="image" />
                        </div>
                        <div>
                            <h2>Guardería Diurna</h2>
                            <p>Csontamos con un servicio de guardería diurna por horas de 8am a 5 o 6pm </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section className="sec stats" id="appointments">
            <div className="content2">
                <div className="mxw800p">
                    <h3 style={{ color: 'white' }}>Citas</h3>
                    <Link to="/about-us" className="btn">Programar Cita Hoy!</Link>
                    <p style={{ color: 'white', fontWeight: 400 }}>Con el uso de nuestro sitio web, puede programar una cita fácilmente y recibir una confirmación por correo electrónico.</p>
                </div>

            </div>
        </section>
        <section className="sec" id="about">
            <div className="content2">
                <div className="mxw800p">
                    <h3>Reseñas</h3>
                    <p>Después de su visita, ¡Díganos qué tan bien lo hicimos!</p>
                    <Link to='/reviews' className="btn">
                        Escribe una reseña</Link>
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
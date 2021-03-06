import './Sidebar.css'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import React, { useEffect } from 'react'
import { load_user } from '../../actions/auth';

const Sidebar = ({ isAuthenticated, }) => {

    useEffect(async () => {
        async function fetchData() {
            await load_user()
        }
        fetchData()

    }, [isAuthenticated])

    const toggle = () => {
        let navigation = document.querySelector('.navigation')
        let toggle = document.querySelector('.toggle')
        navigation.classList.toggle('active')
        toggle.classList.toggle('active')

    }

    const closeBtn = () => {
        const slidebar = document.querySelector('.navigation')
        const toggle = document.querySelector('.toggle')
        slidebar.classList.remove('active')
        toggle.classList.remove('active')
    }

    const authLinks = () => {
        return <>
            <li className="sidebar-li" onClick={closeBtn}>
                <Link to={`/user-appointments`}>
                    <span className="icon"><i className="fa fa-user" aria-hidden="true"></i></span>
                    <span className="title">Tus citas</span>
                </Link>
            </li>
        </>
    }
    return (
        <>
            <div className="navigation">
                <ul className="sidebar-ul">
                    <li className="sidebar-li" onClick={closeBtn}>
                        <Link to='/services'>
                            <span className="icon"><i className="fa fa-wrench" aria-hidden="true"></i></span>
                            <span className="title">Servicios</span>
                        </Link>
                    </li>
                    <li className="sidebar-li" onClick={closeBtn}>
                        <Link to='/appointments'>
                            <span className="icon"><i className="fa fa-calendar" aria-hidden="true"></i></span>
                            <span className="title">Reserva</span>
                        </Link>
                    </li>
                    <li className="sidebar-li" onClick={closeBtn}>
                        <Link to='/day-care'>
                            <span className="icon"><i className="fa fa-paw" aria-hidden="true"></i></span>
                            <span className="title">Guarder??a</span>
                        </Link>
                    </li>
                    <li className="sidebar-li" onClick={closeBtn}>
                        <Link to='/about-us'>
                            <span className="icon"><i className="fa fa-id-card-o" aria-hidden="true"></i></span>
                            <span className="title">Sobre nosotros</span>
                        </Link>
                    </li>
                    <li className="sidebar-li" onClick={closeBtn}>
                        <Link to='/reviews'>
                            <span className="icon"><i className="fa fa-check-circle" aria-hidden="true"></i></span>
                            <span className="title">Rese??as</span>
                        </Link>
                    </li>
                    {isAuthenticated ? authLinks() : null}
                </ul>
            </div>
            <div className="toggle" onClick={toggle}></div>
        </>
    )
}
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,


})

export default connect(mapStateToProps, { load_user })(Sidebar);
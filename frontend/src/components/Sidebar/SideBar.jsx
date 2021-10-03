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

    const authLinks = () => {
        return <>
            <li className="sidebar-li">
                <Link to={`/user-appointments`}>
                    <span className="icon"><i className="fa fa-user" aria-hidden="true"></i></span>
                    <span className="title">Tus Citas</span>
                </Link>
            </li>
        </>
    }
    return (
        <>
            <div className="navigation">
                <ul className="sidebar-ul">
                    <li className="sidebar-li">
                        <Link to='/services'>
                            <span className="icon"><i className="fa fa-wrench" aria-hidden="true"></i></span>
                            <span className="title">Los Servicios</span>
                        </Link>
                    </li>
                    <li className="sidebar-li">
                        <Link to='/appointments'>
                            <span className="icon"><i className="fa fa-calendar" aria-hidden="true"></i></span>
                            <span className="title">Citas</span>
                        </Link>
                    </li>
                    <li className="sidebar-li">
                        <Link to='/about-us'>
                            <span className="icon"><i className="fa fa-id-card-o" aria-hidden="true"></i></span>
                            <span className="title">Sobre nosotros</span>
                        </Link>
                    </li>
                    <li className="sidebar-li">
                        <Link to='/reviews'>
                            <span className="icon"><i className="fa fa-check-circle" aria-hidden="true"></i></span>
                            <span className="title">Reseñas</span>
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
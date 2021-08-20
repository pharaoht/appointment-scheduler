import './Sidebar.css'
import { Link } from 'react-router-dom';

const Sidebar = (props) => {
    const toggle = () => {
        let navigation = document.querySelector('.navigation')
        let toggle = document.querySelector('.toggle')
        navigation.classList.toggle('active')
        toggle.classList.toggle('active')

    }
    return (
        <>
            <div className="navigation">
                <ul className="sidebar-ul">
                    <li className="sidebar-li">
                        <a>
                            <Link to='/services'>
                                <span className="icon"><i class="fa fa-wrench" aria-hidden="true"></i></span>
                                <span className="title">Services</span>
                            </Link>
                        </a>
                    </li>
                    <li className="sidebar-li">
                        <a>
                            <Link to='/appointments'>
                                <span className="icon"><i class="fa fa-calendar" aria-hidden="true"></i></span>
                                <span className="title">Appointments</span>
                            </Link>
                        </a>
                    </li>
                    <li className="sidebar-li">
                        <a>
                            <Link to='/about-us'>
                                <span className="icon"><i class="fa fa-id-card-o" aria-hidden="true"></i></span>
                                <span className="title">About Us</span>
                            </Link>
                        </a>
                    </li>
                    <li className="sidebar-li">
                        <a>
                            <Link to='/reviews'>
                                <span className="icon"><i class="fa fa-check-circle" aria-hidden="true"></i></span>
                                <span className="title">Reviews</span>
                            </Link>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="toggle" onClick={toggle}></div>
        </>
    )
}

export default Sidebar;
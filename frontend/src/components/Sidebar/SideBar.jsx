import './Sidebar.css'


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
                        <a href="#">
                            <span className="icon"><i class="fa fa-wrench" aria-hidden="true"></i></span>
                            <span className="title">Services</span>
                        </a>
                    </li>
                    <li className="sidebar-li">
                        <a href="#">
                            <span className="icon"><i class="fa fa-calendar" aria-hidden="true"></i></span>
                            <span className="title">Appointments</span>
                        </a>
                    </li>
                    <li className="sidebar-li">
                        <a href="#">
                            <span className="icon"><i class="fa fa-id-card-o" aria-hidden="true"></i></span>
                            <span className="title">About Us</span>
                        </a>
                    </li>
                    <li className="sidebar-li">
                        <a href="#">
                            <span className="icon"><i class="fa fa-check-circle" aria-hidden="true"></i></span>
                            <span className="title">Reviews</span>
                        </a>
                    </li>
                </ul>
            </div>
            <div className="toggle" onClick={toggle}></div>
        </>
    )
}

export default Sidebar;
import React from 'react'
import { Link } from 'react-router-dom';

const Home = () => (
    <div>
        <p>Home Page</p>
        <p>Click here to login</p>
        <Link to="/login">Login</Link>
    </div>
)

export default Home;
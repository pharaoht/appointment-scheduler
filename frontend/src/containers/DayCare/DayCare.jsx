import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { BeatLoader } from 'react-spinners';
import { load_user } from '../../actions/auth';

const DayCare = ({ isAuthenticated, user, load_user }) => {


    return <>
        <div>
            hi
        </div>

    </>
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})
export default connect(mapStateToProps, { load_user })(DayCare)
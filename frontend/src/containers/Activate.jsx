import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { verify } from '../actions/auth';


const Activate = ({ verify, match }) => {

    return (
        <div>
            Activate
        </div>
    )

}


export default connect(null, { verify })(Activate);
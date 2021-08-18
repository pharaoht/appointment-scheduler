import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './containers/Home/Home.jsx'
import Signup from './containers/Signup'
import Activate from './containers/Activate'
import ResetPassword from './containers/ResetPassword'
import ResetPasswordConfirm from './containers/ResetPasswordConfirm'
import Layout from './hocs/Layout';
import Appointment from './containers/Appointment/Appointment.jsx'
import { Provider } from 'react-redux';
import store from './store';
import Signupv2 from './containers/SignUp/Signupv2';

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Switch>
                    <div id="app-css-main-div" >
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/login' component={Signupv2}/>
                    <Route exact path='/signup-old' component={Signup}/>
                    <Route exact path='/rest_password' component={ResetPassword}/>
                    <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm}/>
                    <Route exact path='/activate/:uid/:token' component={Activate}/>
                    <Route exact path='/signup' component={Signupv2}/>
                    <Route exact path='/appointments' component={Appointment}/>
                    </div>
                </Switch>
            </Layout>
        </Router>
    </Provider>
);

export default App;
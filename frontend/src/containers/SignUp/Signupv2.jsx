import './Signup.css'

const Signupv2 = () => {


    const signinBtn = () => {
        const formBx = document.querySelector('.formBx')
        const body = document.querySelector('.body-im')
        body.classList.remove('active')
        formBx.classList.remove('active')
    }

    const signupBtn = () => {
        const formBx = document.querySelector('.formBx')
        const body = document.querySelector('.body-im')
        body.classList.add('active')
        formBx.classList.add('active')
    }
    return (
        <div className="body-im">
            <div className="container1">
                <div className="blueBg">
                    <div className="box signin">
                        <h2>Already Have an Account?</h2>
                        <button className="signinBtn" onClick={signinBtn}>Sign in</button>
                    </div>
                    <div className="box signup">
                        <h2>Don't Have an Account?</h2>
                        <button className="signupBtn" onClick={signupBtn}>Sign up</button>
                    </div>
                </div>
                <div className="formBx">
                    <div className="form signinForm">
                        <form>
                            <h3>Sign In</h3>
                            <input type="text" placeholder="Email *" />
                            <input type="password" placeholder="Password *" />
                            <input type="submit" value="Login" />
                            <a href="#" className="forgot">Forgot Password</a>
                        </form>
                    </div>
                    <div className="form signupForm">
                        <form>
                            <h3>Sign Up</h3>
                            <input type="text" placeholder="First Name *" />
                            <input type="text" placeholder="Last Name *" />
                            <input type="text" placeholder="Email *" />
                            <input type="password" placeholder="Password *" />
                            <input type="password" placeholder="Confirm Password *" />
                            <input type="submit" value="Register" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signupv2;
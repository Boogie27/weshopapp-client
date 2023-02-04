import React, { useState, Fragment } from 'react'
import { NavLink, useNavigate   } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faKey,
    faEnvelope
} from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import Cookies from 'js-cookie'
import { 
    url,  
    auth_img
} from '../../Data'
import FormAlert from '../alerts/FormAlert'
import AlertDanger from '../alerts/AlertDanger'
import Preloader from '../preloader/Preloader'




const Login = ({fetchWishlistItems, alertMessage, fetchCartItems, setUser}) => {
    const navigate = useNavigate();
    const old_page = Cookies.get('current_url')
    const [alert, setAlert] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [input, setInput] = useState(null)

    const [isLoginLoader, setIsLoginLoader] = useState(false)
    const [emailAlert, setEmailAlert] = useState('')
    const [passwordAlert, setPasswordAlert] = useState('')
    const [isLoading, setIsLoading ] = useState({state: false, text: ''})
    

    const loginUser = () => {
        let message
        setAlert('')
        setEmailAlert('')
        setPasswordAlert('')
        const user = { email: email, password: password }

        // validate input fields
        const validate = validate_input(user)
        if(validate === 'failed') return

        setIsLoading({state: true, text: 'Please wait...'})
        Axios.post(url('/api/login-user'), user).then((response) => {
            const data = response.data
            
            if(data.validationError === false){
                setIsLoading({state: false, text: ''})
                validateFromBackend(data.validation)
            }else{
                if(data.exists === false){
                     message = {state: true, text: 'Please wait...', message: '*Wrong email or password!', time: 1000}
                    return preloaderToggle(message)
                }
                if(data.verify === 'not-verified'){
                    let txt = '*Account not verified, verification email has been sent to you!'
                    message = {state: true, text: 'Please wait...', message: txt, time: 2000}
                    return preloaderToggle(message)
                }
                
                if(data.data === 'success'){
                    setUser(data.user)
                    loginPreloaderToggle({state: true, text: `Please wait ${data.user.user_name} while we log you in!`, time: 3000})
                    Cookies.set('weshopappuser', data.user.token, { expires: 1 })

                    fetchCartItems(data.user.token)
                    fetchWishlistItems(data.user.token)
                }
            }
            setIsLoading({state: false, text: ''})
        })
    }


    const toggleInput = (string) => {
        setInput(string)
    }


    const validate_input = (input) => {
        let failed = false

        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(input.email.length === 0){
            failed = true
            setEmailAlert("*Email field is required")
        } else if(!input.email.match(validRegex)){
            failed = true
            setEmailAlert("*Invalid email address")
        }

        if(input.password.length === 0){
            failed = true
            setPasswordAlert("*Password field is required")
        }else if(input.password.length < 6){
            failed = true
            setPasswordAlert("*Must be minimum of 6 characters")
        }else if(input.password.length > 12){
            failed = true
            setPasswordAlert("*Must be maximum of 12 characters")
        }

        

        if(failed === true){
            return 'failed'
        }else{
            return 'success'
        }
    }


    const validateFromBackend = (error) => {
        setAlert('')
        setEmailAlert('')
        setPasswordAlert('')

        if(error.email){
            setEmailAlert(error.email)
        }
        if(error.password){
            setPasswordAlert(error.password)
        }
    }



     // set and remove preloader
    const preloaderToggle = (message) => {
        setIsLoading({state: message.state, text: message.text})
        setTimeout(() => {
            if(message.message){
                setAlert(message.message)
            }
            setIsLoading({state: false, text: ''})
        }, message.time)
    }

 // set and remove login preloader
    const loginPreloaderToggle = (message) => {
        setIsLoginLoader({state: message.state, text: message.text})
        setTimeout(() => {
            alertMessage('Login successfully!', 5000)
            setIsLoginLoader({state: false, text: ''})
            if(old_page){
                Cookies.set('current_url', '', { expires: new Date(0) })
                return navigate(old_page)
            }
            return navigate("/")
        }, message.time)
    }

     


    

    return (
        <div className="auth-container">
            {
                isLoginLoader.state ? (
                    <div className="expand-page">
                        <Preloader text={isLoginLoader.text}/>
                    </div>
                ) : (
                    <Fragment>
                        <LeftSide/>
                        <RightSide toggleInput={toggleInput} input={input} password={password}
                            setPassword={setPassword} isLoading={isLoading} email={email} setEmail={setEmail} alert={alert}
                            emailAlert={emailAlert}  loginUser={loginUser} passwordAlert={passwordAlert}
                        />
                    </Fragment>
                )
            }
            
        </div>
    )
}

export default Login





const LeftSide = () => {
    return (
        <div className="auth-left">
            <img src={auth_img('2.png')} alt="authPic"/>
        </div>
    )
}









const RightSide = ({
    toggleInput, input, password, setPassword, email, setEmail, 
    emailAlert, passwordAlert, alert, loginUser, isLoading
    }) => {
    return (
        <div className="auth-right">
            <div className="title-header">
                <h3>Hello There!</h3>
                <p>Login to shop for products</p>
                { alert && <AlertDanger alert={alert}/>}
            </div>
            <div className="auth-form">
                <div className="form-group">
                    { emailAlert && (<FormAlert alert={emailAlert}/>) }
                    <div className="form-group-input">
                        <div className="form-icon"><FontAwesomeIcon className={`icon ${input === 'email' ? 'active' : ''}`}  icon={faEnvelope} /></div>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} onBlur={() => toggleInput(null)} onFocus={() => toggleInput('email')}  placeholder="Enter email" />
                    </div> 
                </div>
                <div className="form-group">
                    { passwordAlert && (<FormAlert alert={passwordAlert}/>) }
                    <div className="form-group-input">
                        <div className="form-icon"><FontAwesomeIcon className={`icon ${input === 'password' ? 'active' : ''}`}  icon={faKey} /></div>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} onBlur={() => toggleInput(null)} onFocus={() => toggleInput('password')}  placeholder="Enter password" />
                    </div>
                </div>
                <div className="form-button">
                    <LoginButton isLoading={isLoading} loginUser={loginUser}/>
                </div>
                <div className="form-reset">
                    Click here to reset password
                    <NavLink to="/reset-password">Reset password</NavLink>
                </div>
            </div>
        </div>
    )
}





const LoginButton = ({isLoading, loginUser}) => {
    return (
        <Fragment>
            {isLoading.state ? (
                <button className="register-btn">{isLoading.text}</button>
            ) : (
                <button onClick={() => loginUser()} className="register-btn">LOGIN</button>
            )}
            <div className="login-link">
                Dont have an account? <NavLink to="/register">Register</NavLink>
            </div>
        </Fragment>
    )
}
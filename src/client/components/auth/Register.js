import React, { useState, useEffect } from 'react'
import { NavLink, useSearchParams, useNavigate   } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faKey,
    faPen,
    faUser,
    faLock,
    faEnvelope
} from '@fortawesome/free-solid-svg-icons'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Axios from 'axios'
import Cookies from 'js-cookie'
import { 
    url, 
    today, 
    auth_img
} from '../../Data'
import FormAlert from '../alerts/FormAlert'
import AlertDanger from '../alerts/AlertDanger'
import AlertSuccess from '../alerts/AlertSuccess'





const Register = ({alertMessage, setUser, isLoading, setIsLoading}) => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState('')
    const [alertSuccess, setAlertSuccess] = useState('')

    const [input, setInput] = useState(null)
    const [gender, setGender] = useState('male')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [emailAlert, setEmailAlert] = useState('')
    const [usernameAlert, setUsernameAlert] = useState('')
    const [passwordAlert, setPasswordAlert] = useState('')
    const [confirmPasswordAlert, setConfirmPasswordAlert] = useState('')


    const toggleInput = (string) => {
        setInput(string)
    }

    const genderToggle = (gender) => {
        setGender(gender)
    }


    const clearInput = () => {
        setEmail('')
        setUsername('')
        setPassword('')
        setConfirmPassword('')
    }


    // Register a User
    const registerUser = () => {
        const user = {
            email: email,
            username: username,
            password: password,
            confirmPassword: confirmPassword,
            gender: gender
        }
        

        // validate input fields
        const validate = validate_input(user)
        if(validate === 'failed') return

        setIsLoading({state: true, text: 'Creating account, Please wait...'})
        Axios.post(url('/api/register-user'), user).then((response) => {
            setAlert('')
            setEmailAlert('')
            setUsernameAlert('')
            setPasswordAlert('')
            setConfirmPasswordAlert('')
            const data = response.data
            
            if(data.validationError){
                setIsLoading({state: false, text: ''})
                validateFromBackend(data.validation)
            }else{
                if(data === 'exists'){
                    setIsLoading({state: false, text: ''})
                    return setAlert('User already exists!')
                }
                if(data.data === 'success'){
                    // setUser(data.user)
                    const string = {
                        time: 3000,
                        messageTime: 5000,
                        message: 'Verification mail has been sent to your email successfully!'
                    }
                    return toggleAlert(string)
                  
                    // alertMessage("Account created successfully!", 5000)
                    // Cookies.set('weshopappuser', data.user.token, { expires: 1 })
                    // return navigate("/")
                }
            }
            setIsLoading({state: false, text: ''})
        })
    }




    const validate_input = (input) => {
        let failed = false

        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(input.email === ""){
            failed = true
            setEmailAlert("*Email field is required")
        } else if(!input.email.match(validRegex)){
            failed = true
            setEmailAlert("*Invalid email address")
        }

        if(input.username === ""){
            failed = true
            setUsernameAlert("*Username field is required")
        }else if(input.username.length < 3){
            failed = true
            setUsernameAlert("*Must be minimum of 3 characters")
        }else if(input.username.length > 50){
            failed = true
            setUsernameAlert("*Must be maximum of 50 characters")
        }

        if(input.password === ""){
            failed = true
            setPasswordAlert("*Password field is required")
        }else if(input.password.length < 6){
            failed = true
            setPasswordAlert("*Must be minimum of 6 characters")
        }else if(input.password.length > 12){
            failed = true
            setPasswordAlert("*Must be maximum of 12 characters")
        }

        if(input.confirmPassword === ""){
            failed = true
            setConfirmPasswordAlert("*Confirm Password field is required")
        }else if(input.confirmPassword !== input.password){
            failed = true
            setConfirmPasswordAlert("*Confirm password Must equals password")
        }

        if(failed == true){
            return 'failed'
        }else{
            return 'success'
        }
    }



    const validateFromBackend = (error) => {
        if(error.email){
            setEmailAlert(error.email)
        }
        if(error.username){
            setUsernameAlert(error.username)
        }
        if(error.password){
            setPasswordAlert(error.password)
        }
        if(error.confirmPassword){
            setConfirmPasswordAlert(error.confirmPassword)
        }
    }




    // set time on mail sending
    const alertTimeToggle = (message, time) => {
        setAlertSuccess(message)
        setTimeout(function(){
            setAlertSuccess('')
        }, time)
    }

    const toggleAlert = (string) => {
         setTimeout(function(){
            clearInput()
            setIsLoading({state: false, text: ''})
            alertTimeToggle(string.message, string.messageTime)
        }, string.time)
    }



    return (
        <div className="auth-container">
            <LeftSide/>
            <RightSide alertSuccess={alertSuccess} toggleInput={toggleInput} input={input} gender={gender} password={password}
                genderToggle={genderToggle} username={username} setUsername={setUsername}
                setPassword={setPassword} registerUser={registerUser} confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword} email={email} setEmail={setEmail} passwordAlert={passwordAlert}
                emailAlert={emailAlert} usernameAlert={usernameAlert} confirmPasswordAlert={confirmPasswordAlert}
                alert={alert}
            />
        </div>
    )
}

export default Register





const LeftSide = () => {
    return (
        <div className="auth-left">
            <img src={auth_img('1.png')} alt="authPic"/>
        </div>
    )
}



const RightSide = ({
    toggleInput, input, gender, genderToggle, registerUser, setConfirmPassword,
    setUsername, username, password, setPassword, email, setEmail, confirmPassword,
    emailAlert, usernameAlert, confirmPasswordAlert, passwordAlert, alert, alertSuccess
    }) => {
    return (
        <div className="auth-right">
            <div className="title-header">
                <h3>Hello There!</h3>
                <p>Register to shop for products</p>
                { alert && <AlertDanger alert={alert}/>}
                { alertSuccess && <AlertSuccess alert={alertSuccess}/>}
            </div>
            <div className="auth-form">
                <div className="form-group">
                    { usernameAlert && (<FormAlert alert={usernameAlert}/>) }
                    <div className="form-group-input">
                        <div className="form-icon"><FontAwesomeIcon className={`icon ${input === 'username' ? 'active' : ''}`}  icon={faUser} /></div>
                        <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} onBlur={() => toggleInput(null)} onFocus={() => toggleInput('username')} placeholder="Enter username" />
                    </div>
                </div>
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
                <div className="form-group">
                    { confirmPasswordAlert && (<FormAlert alert={confirmPasswordAlert}/>) }
                    <div className="form-group-input">
                        <div className="form-icon"><FontAwesomeIcon className={`icon ${input === 'confirm-password' ? 'active' : ''}`}  icon={faLock} /></div>
                        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} onBlur={() => toggleInput(null)} onFocus={() => toggleInput('confirm-password')}  placeholder="Confirm password" />
                    </div>
                </div>
                <div className="form-group">
                    <div className="gender-container">
                        <div className="form-gender">
                            <input type="checkbox" onChange={() => genderToggle('male')} className="checkbox" value="male" checked={gender === 'male' ? 'checked' : ''}/>
                            <label htmlFor="gender">Male</label>
                        </div>
                        <div className="form-gender">
                            <input type="checkbox" onChange={() => genderToggle('female')} className="checkbox" value="female" checked={gender === 'female' ? 'checked' : ''}/>
                            <label htmlFor="gender">Female</label>
                        </div>
                    </div>
                </div>
                <div className="form-button">
                    <button onClick={() => registerUser()} className="register-btn">REGISTER</button>
                    <div className="login-link">
                        Already Registered? <NavLink to="/login">Login</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
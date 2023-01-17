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



const ResetPassword = ({fetchWishlistItems, alertMessage, fetchCartItems, setUser, isLoading, setIsLoading}) => {
    const navigate = useNavigate();
    const [alert, setAlert] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailAlert, setEmailAlert] = useState('')
    const [input, setInput] = useState(null)

    

    const sendEmail = () => {
        const user = { email: email }

    }

    const toggleInput = (string) => {
        setInput(string)
    }




    return (
        <div className="auth-container">
            <LeftSide/>
            <RightSide alert={alert} email={email} input={input} toggleInput={toggleInput} emailAlert={emailAlert} toggleInput={toggleInput} input={input} setEmail={setEmail} sendEmail={sendEmail}
            />
        </div>
    )
}

export default ResetPassword





const LeftSide = () => {
    return (
        <div className="auth-left">
            <img src={auth_img('4.png')} alt="authPic"/>
        </div>
    )
}









const RightSide = ({ email, alert, emailAlert, toggleInput, input, setEmail, sendEmail, isLoading }) => {
    return (
        <div className="auth-right">
            <div className="title-header">
                <h3>Oops, lets help you!</h3>
                <p>Provide your email to get reset details</p>
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
                <div className="form-button">
                    <button onClick={() => sendEmail()} className="register-btn">Reset Password</button>
                    <div className="login-link">
                        Do you have an account? <NavLink to="/login">Login</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
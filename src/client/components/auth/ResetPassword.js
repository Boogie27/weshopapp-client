import React, { useState } from 'react'
import { NavLink, useSearchParams } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faEnvelope
} from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import { 
    url, 
    auth_img
} from '../../Data'
import FormAlert from '../alerts/FormAlert'
import AlertDanger from '../alerts/AlertDanger'
import AlertSuccess from '../alerts/AlertSuccess'
import PasswordRestForm from './PasswordRestForm'



const ResetPassword = ({fetchWishlistItems, alertMessage, fetchCartItems, setUser, isLoading, setIsLoading}) => {
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token')

    const [alert, setAlert] = useState('')
    const [alertSuccess, setAlertSuccess] = useState('')
    const [email, setEmail] = useState('')
    const [emailAlert, setEmailAlert] = useState('')
    const [input, setInput] = useState(null)
    const [isSendingMail, setIsSendingMail] = useState(false)
    const [isFormOpen, setIsFormOpen] = useState(false)


    // open and close reset password form
    const formToggle = (state) => {
        setIsFormOpen(state)
        if(state === false){
            // delete reset password details from database
            Axios.post(url('/api/delete-reset-password'), {token: token}).then((response) => {
                const data = response.data
                if(data.isDeleted){
                    setIsFormOpen(false)
                }
            })
        }
    }

    // check if token exists in data base then display reset pwd form
    const CheckForToken = () => {
        if(token){
            Axios.post(url('/api/check-for-token'), {token: token}).then((response) => {
                const data = response.data
                if(data.tokenExists === true){
                    formToggle(true)
                }else{
                    formToggle(false)
                }
            })
        }
    }
    CheckForToken()
    
    
    // send email to user
    const sendEmail = () => {
        setAlert('')
        setEmailAlert("")
        setAlertSuccess('')

        // validate input fields
        const validate = validate_input(email)
        if(validate === 'failed') return

        mailTimeToggle(10000) // toggle btw submit button text
        
        Axios.post(url('/api/reset-password-email'), {email: email}).then((response) => {
            const data = response.data
            if(data.validationError){
                mailTimeToggle(500) 
                setIsLoading({state: false, text: ''})
                return setEmailAlert(data.validation.email)
            }

            if(data.exists === false){
                mailTimeToggle(500)
                return setAlert(`*${email} does not exist!`)
            }

            if(data.data === true){
                setAlertSuccess('Reset mail has been sent to your email successfully!')
                mailTimeToggle(1000)
                return console.log(data)
            }
        })
        // display successful notification
        // display reset password form by settimeout 
    }

    const toggleInput = (string) => {
        setInput(string)
    }


    // set time on mail sending
    const mailTimeToggle = (time) => {
        setIsSendingMail(true)
        setTimeout(function(){
            setEmail('')
            setIsSendingMail(false)
        }, time)
    }


    // display reset password form
    const displayResetPwdForm = (state, time) => {
        setTimeout(function(){
            setAlertSuccess('')
            setIsFormOpen(state)
        }, time)
    }

    

     const validate_input = (email) => {
        let failed = false

        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(email.length === 0){
            failed = true
            setEmailAlert("*Email field is required")
        } else if(!email.match(validRegex)){
            failed = true
            setEmailAlert("*Invalid email address")
        }

        if(failed === true){
            return 'failed'
        }else{
            return 'success'
        }
    }





    return (
        <div className="auth-container">
            <LeftSide/>
            <RightSide alert={alert} email={email} input={input} emailAlert={emailAlert} 
                toggleInput={toggleInput} setEmail={setEmail} sendEmail={sendEmail}
                isSendingMail={isSendingMail} alertSuccess={alertSuccess}
            />
            {isFormOpen && <PasswordRestForm displayResetPwdForm={displayResetPwdForm} formToggle={formToggle}/>}
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









const RightSide = ({
        email, alert, emailAlert, toggleInput, input, setEmail, sendEmail, isLoading,
        isSendingMail, alertSuccess,
    }) => {
    return (
        <div className="auth-right">
            <div className="title-header">
                <h3>Oops, lets help you!</h3>
                <p>Provide your email to get reset details</p>
                { alert && <AlertDanger alert={alert}/>}
                { alertSuccess && <AlertSuccess alert={alertSuccess}/>}
            </div>
            <div className="auth-form">
                <div className="form-group">
                    <div className="form-alert">{ emailAlert && (<FormAlert alert={emailAlert}/>) }</div>
                    <div className="form-group-input">
                        <div className="form-icon"><FontAwesomeIcon className={`icon ${input === 'email' ? 'active' : ''}`}  icon={faEnvelope} /></div>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} onBlur={() => toggleInput(null)} onFocus={() => toggleInput('email')}  placeholder="Enter email" />
                    </div> 
                </div>
                <div className="form-button">
                {
                    isSendingMail ? (
                        <button className="register-btn">Please wait....</button>
                    ) : (
                        <button onClick={() => sendEmail()} className="register-btn">Reset Password</button>
                    )
                }
                    
                    <div className="login-link">
                        Do you have an account? <NavLink to="/login">Login</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
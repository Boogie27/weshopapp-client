import React, { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark, faKey } from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import FormAlert from '../alerts/FormAlert'
import AlertDanger from '../alerts/AlertDanger'
import AlertSuccess from '../alerts/AlertSuccess'
import Cookies from 'js-cookie'
import { url } from '../../Data'


const PasswordRestForm = ({formToggle, displayResetPwdForm}) => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const token = searchParams.get('token')

    const [dangerAlert, setDangerAlert] = useState('')
    const [successAlert, setSuccessAlert] = useState('')
    const [emailAlert, setEmailAlert] = useState('')
    const [passwordAlert, setPasswordAlert] = useState('')
    const [confirmPasswordAlert, setConfirmPasswordAlert] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')



    const submitForm = () => {
        setDangerAlert('')
        setEmailAlert('')
        setPasswordAlert('')
        setConfirmPasswordAlert('')
        const user_input = { token: token, email: email, password: password, confirmPassword: confirmPassword}

        // validate inputs fields
        // const validation = validate_input(user_input)
        // if(validation === 'failed') return

            Axios.post(url('/api/reset-password'), {user_input}).then((response) => {
            const data = response.data
            const error = serverValidation(data)
            if(error) return
           
            if(data.tokenExists == false){
                displayResetPwdForm(false, 4000)
                setDangerAlert('*Email does not exists')
            }
           
            if(data.exists == false){
                displayResetPwdForm(false, 4000)
                setDangerAlert('*User does not exists')
            }
            if(data.passwordUpdate){
                displayResetPwdForm(false, 4000)
                return setSuccessAlert('Password updated successfully! Proceed to login')
            }else{
                displayResetPwdForm(false, 4000)
                return setDangerAlert('*Something went wrong, try again!')
            }
            
        })
       
    }


    const serverValidation = (data) => {
        let error = ''
        if(data.validationError){
            error = data.validation
            if(error.email){
                setEmailAlert(error.email)
            }
            if(error.password){
                setPasswordAlert(error.password)
            }
            if(error.confirmPassword){
                setConfirmPasswordAlert(error.confirmPassword)
            }
            return true;
        }
        return false
    }


    const validate_input = (input) => {
        let failed = false

        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(input.email.length == 0){
            failed = true
            setEmailAlert("*Email field is required")
        } else if(!input.email.match(validRegex)){
            failed = true
            setEmailAlert("*Invalid email address")
        }

        if(input.password.length == 0){
            failed = true
            setPasswordAlert("*Password field is required")
        }else if(input.password.length < 6){
            failed = true
            setPasswordAlert("*Must be minimum of 6 characters")
        }else if(input.password.length > 12){
            failed = true
            setPasswordAlert("*Must be maximum of 12 characters")
        }
        
        if(input.confirmPassword.length == 0){
            failed = true
            setConfirmPasswordAlert("*Confirm password field is required")
        }
        if(input.confirmPassword != input.password){
            failed = true
            setConfirmPasswordAlert("*Password must equal to Confirm password")
        }

        if(failed == true){
            return 'failed'
        }else{
            return 'success'
        }
    }


    

    


    return (
        <div className={`password-reset-parent`}>
            <div className="password-reset-container">
                <div className="pwd-reset-form">
                    <div className="cancel-btn">
                        <FontAwesomeIcon onClick={() => formToggle(false)} className="icon"  icon={faXmark} />
                    </div>
                    <div className="title-header">
                        <h3>Reset Password</h3>
                        <p>We will help you reset your password in these few steps</p>
                        { dangerAlert && <AlertDanger alert={dangerAlert}/>}
                        { successAlert && <AlertSuccess alert={successAlert}/>}
                    </div>
                    <div className="form-group">
                        <div className="form-alert">{ emailAlert && (<FormAlert alert={emailAlert}/>) }</div>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter email"/>
                    </div>
                    <div className="form-group">
                        <div className="form-alert">{ passwordAlert && (<FormAlert alert={passwordAlert}/>) }</div>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} placeholder="Enter password"/>
                    </div>
                    <div className="form-group">
                    <div className="form-alert">{ confirmPasswordAlert && (<FormAlert alert={confirmPasswordAlert}/>) }</div>
                        <input type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder="Enter confirm password"/>
                    </div>
                    <div className="form-group">
                        <button onClick={() => submitForm()} type="submit">
                        <FontAwesomeIcon className="icon"  icon={faKey} />
                        Reset Password</button>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default PasswordRestForm














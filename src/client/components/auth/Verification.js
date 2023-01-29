import React, { useState, useEffect, Fragment } from 'react'
import { NavLink, useSearchParams, useNavigate  } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faThumbsUp,
    faThumbsDown    
} from '@fortawesome/free-solid-svg-icons'
import Preloader from '../preloader/Preloader'
import Axios from 'axios'
import { 
    url, 
} from '../../Data'







const Verification = () => {
    const [searchParams] = useSearchParams();
    const verify_token = searchParams.get('verify')
    const [userName, setUserName ] = useState('')
    const [isLoading, setIsLoading ] = useState({state: true, text: 'Verifying email, Please Wait...'})

   



    const checkUserVerification = () => {
        if(searchParams.has('verify')){
            Axios.get(url(`/api/verify-user?verify=${verify_token}`)).then((response) => {
                const data = response.data
                if(data.isVerified === true){
                    setUserName(data.username)
                    return preloaderToggle(3000)
                }
                return preloaderToggle(3000)
            })
        }
        return preloaderToggle(3000)
    }


    // toggle preloader
    const preloaderToggle = (time) => {
        setTimeout(function(){
            setIsLoading({state: false, text: ''})
        }, time)
    }



    useEffect(() => {
        checkUserVerification()
    }, [])



    return (
        <Fragment>
            {
                isLoading.state ? (
                <div className="expand-page">
                    <Preloader text={isLoading.text}/>
                </div>
                ) : (
                    <Fragment>
                        {
                            userName ? (<VerifyContainer userName={userName}/>) : (<ErrorVerifyContainer/>)
                        }
                    </Fragment>
            )
            }
        </Fragment>
    )
}


export default Verification





const VerifyContainer = ({userName}) => {
    return (
        <div className="verification-container">
            <div className="verify-inner">
                <div className="verify-icon">
                    <FontAwesomeIcon className="icon"  icon={faThumbsUp} />
                </div>
                <div className="verification-body">
                    <div className="title-header"><h3>Verification Successfull</h3></div>
                    <div className="verification-text">
                        <p>
                            Thank you {userName ? userName : 'Doe'}, We have successfully verified your email, you can now procceed to shopping.
                        </p>
                    </div>
                    <div className="verification-btn">
                        <NavLink to="/login">Continue Shopping</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}









const ErrorVerifyContainer = () => {
    return (
        <div className="verification-container">
            <div className="verify-inner">
                <div className="verify-icon">
                    <FontAwesomeIcon className="icon bg-danger"  icon={faThumbsDown} />
                </div>
                <div className="verification-body">
                    <div className="title-header"><h3>Verification Failed</h3></div>
                    <div className="verification-text">
                        <p>
                            Something went wrong, Please try again later or contact the admin...
                        </p>
                    </div>
                    <div className="verification-btn">
                        <NavLink to="/" className="">Continue Shopping</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
import React, { useState, useEffect, Fragment } from 'react'
import { NavLink, useSearchParams, useNavigate  } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faThumbsUp
} from '@fortawesome/free-solid-svg-icons'
import Preloader from '../preloader/Preloader'








const Verification = () => {
    const [isLoading, setIsLoading ] = useState({state: true, text: 'Verifying email, Please Wait...'})



    return (
        <Fragment>
            {
                isLoading ? (
                <div className="expand-page">
                    <Preloader text={isLoading.text}/>
                </div>
                ) : (<VerifyContainer/>)
            }
        </Fragment>
    )
}


export default Verification





const VerifyContainer = () => {
    return (
        <div className="verification-container">
            <div className="verify-inner">
                <div className="verify-icon">
                    <FontAwesomeIcon className="icon"  icon={faThumbsUp} />
                </div>
                <div className="verification-body">
                    <div className="title-header"><h3>Verification Success</h3></div>
                    <div className="verification-text">
                        <p>
                            Thank you Charles, We have successfully verified your email, you can now procceed to shopping.
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
import React, { useState, useEffect, Fragment, useRef } from 'react'
import { NavLink, useSearchParams  } from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Preloader from '../preloader/Preloader'
import {  url, paymentSuccessImg } from '../../Data'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faThumbsUp    
} from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'







const PaySuccess = () => {
    const temporary = useRef()
    const [isLoading, setIsLoading ] = useState({state: true, text: 'Fetching Order, Please Wait...'}) 
     

    const makeOrder = () => {
        const items = {
            user: '63d6ae97172ee6114acaedd3',
            email: 'anonyecharles@gmail.com',
            reference: 'D26ifh49jahg',
            method: "card",
            card_vendor: "strype"
        }
        Axios.post(url(`/api/make-order`), items).then((response) => {
            const data = response.data
            console.log(data)
        })
    }

    
    
    // set and remove preloader
    const preloaderToggle = (state, text, time) => {
        setIsLoading({state: state, text: text})
        setTimeout(() => {
        setIsLoading({state: false, text: ''})
        }, time)
    }


    temporary.current = makeOrder

  useEffect(() => {
    temporary.current()
    preloaderToggle(true, 'Checking Transaction, Please Wait...', 2000)
}, [])


    return (
        <Fragment>
            {
                isLoading.state ? (
                    <div className="expand-page">
                        <Preloader text={isLoading.text}/>
                    </div>
                ) : (
                <div className="paymentsuccess-container">
                    <Row className="show-grid">
                        <Col xs={12} sm={12} md={5} lg={4} xl={4}><LeftSide /></Col>
                        <Col xs={12} sm={12} md={7} lg={8} xl={8}><RightSide/></Col>
                    </Row>
                </div>
                )
            }
        </Fragment>
    )
}

export default PaySuccess





const LeftSide = () => {
    return (
        <div className="leftside-pys-container">
            <img src={paymentSuccessImg('1.png')} alt="1.jpg"/>
        </div>
    )
}




const RightSide = () => {
    return (
        <div className="payment-success-container">
            <div className="payment-success-inner">
                <div className="success-icon">
                    <FontAwesomeIcon className="icon"  icon={faThumbsUp} />
                </div>
                <div className="payment-success-body">
                    <div className="title-header"><h3>Payment Successfull!</h3></div>
                    <div className="payment-success-text">
                        <p>
                            Thank you Charles, we have received your order. your order will be shipped very soon!
                        </p>
                    </div>
                    <div className="paysuccess-btn">
                        <NavLink to="/" className="order-icon">View Order</NavLink>
                        <NavLink to="/" className="shop-icon">Continue Shopping</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}
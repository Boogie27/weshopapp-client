import React, { useState, useEffect, Fragment } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Preloader from '../preloader/Preloader'
import {  paymentSuccessImg } from '../../Data'






const PaySuccess = () => {
    const [isLoading, setIsLoading ] = useState({state: true, text: 'Fetching Order, Please Wait...'}) 
     
    
    
    // set and remove preloader
    const preloaderToggle = (state, text, time) => {
        setIsLoading({state: state, text: text})
        setTimeout(() => {
        setIsLoading({state: false, text: ''})
        }, time)
    }



  useEffect(() => {
    preloaderToggle(true, 'Fetching Order, Please Wait...', 2000)
}, [])


    return (
        <Fragment>
            {
                isLoading.state ? (
                    <div className="expand-page">
                        <Preloader text={isLoading.text}/>
                    </div>
                ) : (
                <div className="checkout-container">
                    <Row className="show-grid">
                        <Col xs={12} sm={12} md={4} lg={4} xl={4}><LeftSide /></Col>
                        <Col xs={12} sm={12} md={8} lg={8} xl={8}><RightSide/></Col>
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
        <div className="">RightSide</div>
    )
}
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import RightSide from './RightSide'
import LeftSide from './LeftSide'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {  token } from '../../Data'
import Preloader from '../preloader/Preloader'





const Checkout = ({cart}) => {
    // fetch cart items
    // implement checkout
    const [isLoading, setIsLoading ] = useState({loading: false, text: 'Fetching Order, Please Wait...'}) 


    

    return (
        <div className="checkout-container">
            <Row className="show-grid">
                <Col xs={12} sm={12} md={6} lg={8} xl={8}><LeftSide /></Col>
                <Col xs={12} sm={12} md={6} lg={4} xl={4}><RightSide cart={cart}/></Col>
            </Row>
            {
                isLoading.loading ? (<Preloader text={isLoading.text}/>) : ''
            }
        </div>
    )
}


export default Checkout




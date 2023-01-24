import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import RightSide from './RightSide'
import LeftSide from './LeftSide'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const Checkout = () => {
    return (
        <div className="checkout-container">
            <Row className="show-grid">
                <Col xs={12} sm={12} md={6} lg={8} xl={8}><LeftSide /></Col>
                <Col xs={12} sm={12} md={6} lg={4} xl={4}><RightSide /></Col>
            </Row>
        </div>
    )
}


export default Checkout




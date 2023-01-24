import React, { useState } from 'react'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';







const LeftSide = () => {
    return (
        <div className="checkout-left">
            <div className="title-header top">
                <h3>SHIPPING</h3>
            </div>
            <div className="leftside-body">
                <div className="leftside-form">
                    <div className="title-header">
                        <h3>Shipping address</h3>
                    </div>
                    <Row>
                        <Col xl={6} sm={6}>
                            <div className="form-group">
                                <div className="form-alert">error</div>
                                <input type="text" placeholder="First Name"/>
                            </div>
                        </Col>
                        <Col xl={6} sm={6}>
                            <div className="form-group">
                                <div className="form-alert">error</div>
                                <input type="text" placeholder="Last Name"/>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className="form-group">
                                <div className="form-alert">error</div>
                                <input type="text" placeholder="Enter Address"/>
                            </div>
                        </Col>
                        <Col xl={4} sm={6}>
                            <div className="form-group">
                                <div className="form-alert">error</div>
                                <input type="text" placeholder="Town"/>
                            </div>
                        </Col>
                        <Col xl={4} sm={6}>
                            <div className="form-group">
                                <div className="form-alert">error</div>
                                <input type="text" placeholder="Post Code"/>
                            </div>
                        </Col>
                        <Col xl={4}>
                            <div className="form-group">
                                <div className="form-alert">error</div>
                                <input type="text" placeholder="County"/>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="leftside-form">
                    <div className="title-header">
                        <h3>Contact Information</h3>
                    </div>
                    <Row>
                        <Col xl={6} sm={6}>
                            <div className="form-group">
                                <div className="form-alert">error</div>
                                <input type="text" placeholder="First Name"/>
                            </div>
                        </Col>
                        <Col xl={6} sm={6}>
                            <div className="form-group">
                                <div className="form-alert">error</div>
                                <input type="text" placeholder="Last Name"/>
                            </div>
                        </Col>
                        <Col xl={12}>
                            <div className="form-group">
                                <div className="form-alert">error</div>
                                <input type="text" placeholder="Enter Address"/>
                            </div>
                        </Col>
                        <Col xl={4} sm={6}>
                            <div className="form-group">
                                <div className="form-alert">error</div>
                                <input type="text" placeholder="Town"/>
                            </div>
                        </Col>
                        <Col xl={4} sm={6}>
                            <div className="form-group">
                                <div className="form-alert">error</div>
                                <input type="text" placeholder="Post Code"/>
                            </div>
                        </Col>
                        <Col xl={4} sm={6}>
                            <div className="form-group">
                                <div className="form-alert">error</div>
                                <input type="text" placeholder="County"/>
                            </div>
                        </Col>
                        <Col xl={4} sm={6}>
                            <div className="form-group">
                                <div className="form-alert">error</div>
                                <input type="text" placeholder="Mobile Phone"/>
                            </div>
                        </Col>
                        <Col xl={8}>
                            <div className="form-group">
                                <div className="form-alert">error</div>
                                <input type="text" placeholder="Email"/>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="leftside-form">
                    <div className="title-header">
                        <h3>Payment Information</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default LeftSide




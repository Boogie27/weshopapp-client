import React, { useState, Fragment } from 'react'




const RightSide = () => {
    return (
        <div className="checkout-right">
            <Summary/>
            <BagSummary/>
        </div>
    )
}


export default RightSide









const Summary = () => {
    return (
        <Fragment>
            <div className="title-header top">
                <h3>Order Summary</h3>
            </div>
            <div className="rightside-body">
                <div className="subtotal">
                    <ul>
                        <li><span>Subtotal</span><span>100,00</span></li>
                        <li><span>Shipping Fee</span><span>5,00</span></li>
                        <li><span>Shipping</span><span>(2 items)</span></li>
                    </ul>
                </div>
                <div className="total">
                    <h3>Total</h3>
                    <h3>100,00</h3>
                </div>
            </div>
        </Fragment>
    )
}








const BagSummary = () => {
    return (
        <div className="bagsummary-container">
            hello
        </div>
    )
}
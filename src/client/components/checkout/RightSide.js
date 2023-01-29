import React, { useState, Fragment, useEffect } from 'react'
import {  product_img } from '../../Data'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPlus,
    faMinus,
    faTrashCan,
} from '@fortawesome/free-solid-svg-icons'





const RightSide = ({cart}) => {
    // useEffect(() => {
    //     console.log(cart)
    // }, [cart])



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
            <div className="title-header"><h3>BAG SUMMARY</h3></div>
            <div className="bagsummary-parent">
                <SummaryItem/>
                <SummaryItem/>
                <SummaryItem/>
                <SummaryItem/>
                <SummaryItem/>
            </div>
            <div className="bagsummary-delete-all">
                <button type="button">
                <FontAwesomeIcon className="icon-trash"  icon={faTrashCan} /> Delete All
                </button>
            </div>
        </div>
    )
}




const SummaryItem = () => {
    return (
        <div className="bagsummary-body">
            <SummaryImage/>
            <SummaryDetail/>
        </div>
    )
}





const SummaryImage = () => {
    return (
        <div className="bagsummary-img">
            <NavLink to="/">
                <img src={product_img('1.jpg')} alt=""/>
            </NavLink>
        </div>
    )
}





const SummaryDetail = () => {
    return (
        <div className="bagsummary-detail">
            <ul>
                <li className="name">
                    <NavLink to="/">Apply phone</NavLink>
                </li>
                <li>Price: 29,000</li>
                <li>Old Price: <s className="text-danger">29,000</s></li>
                <li>Quantity: (2)</li>
            </ul>
            <div className="bagsummary-btn">
                <div className="btn-btn">
                    <button type="button">
                        <FontAwesomeIcon className="icon"  icon={faMinus} />
                    </button>
                    <button type="button">
                        <FontAwesomeIcon className="icon"  icon={faPlus} />
                    </button>
                </div>
                <button type="button" className="btn-trash">
                    <FontAwesomeIcon className="icon-trash"  icon={faTrashCan} />
                </button>
            </div>
        </div>
    )
}
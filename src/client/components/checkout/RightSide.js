import React, {  Fragment } from 'react'
import {  product_img, money, cart_img } from '../../Data'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPlus,
    faMinus,
    faTrashCan,
    faArrowRightLong,
} from '@fortawesome/free-solid-svg-icons'





const RightSide = ({cart, shipping, totalPrice, quantityToggle, CartModalToggle}) => {

    return (
        <div className="checkout-right">
            <Summary cart={cart} shipping={shipping} totalPrice={totalPrice}/>
            <BagSummary cart={cart} quantityToggle={quantityToggle} CartModalToggle={CartModalToggle}/>
        </div>
    )
}


export default RightSide









const Summary = ({cart, shipping, totalPrice}) => {

    return (
        <Fragment>
            <div className="title-header top">
                <h3>Order Summary</h3>
            </div>
            <div className="rightside-body">
                <div className="subtotal">
                    <ul>
                        <li><span>Subtotal</span><span>{`${money(totalPrice)}.00`}</span></li>
                        <li><span>Shipping Fee</span><span>{`${cart.length ? money(shipping) : money(0)}.00`}</span></li>
                        <li><span>Shipping</span><span>({cart.length} items)</span></li>
                    </ul>
                </div>
                <div className="total">
                    <h3>Total</h3>
                    <h3>{`${cart.length ? money(totalPrice + shipping) : money(0)}.00`}</h3>
                </div>
            </div>
        </Fragment>
    )
}








const BagSummary = ({cart, quantityToggle, CartModalToggle}) => {
    return (
        <div className="bagsummary-container">
            <div className="title-header"><h3>BAG SUMMARY</h3></div>
            {
                cart.length === 0 ? (
                    <EmptyCart/>
                ) : (
                    <Fragment>
                        <div className="bagsummary-parent">
                            {cart.map((item, index) => (<SummaryItem key={index} index={index} item={item} CartModalToggle={CartModalToggle} quantityToggle={quantityToggle}/>)) }
                        </div>
                        <div className="bagsummary-make-payment">
                            {/* <button type="button">Make Payment</button> */}
                            <NavLink to="/payment-success">Make Payment</NavLink>
                        </div>
                    </Fragment>
                )
            }
        </div>
    )
}




const SummaryItem = ({item, index, quantityToggle, CartModalToggle}) => {

    return (
        <div className="bagsummary-body">
            <SummaryImage image={item.product.image} />
            <SummaryDetail item={item} index={index} quantityToggle={quantityToggle} CartModalToggle={CartModalToggle}/>
        </div>
    )
}





const SummaryImage = ({image}) => {
    return (
        <div className="bagsummary-img">
            <NavLink to="/">
                <img src={product_img(image[0])} alt={image[0]}/>
            </NavLink>
        </div>
    )
}





const SummaryDetail = ({item, index, quantityToggle, CartModalToggle}) => {
    const product = item.product

    return (
        <div className="bagsummary-detail">
            <ul>
                <li className="name">
                    <NavLink to="/">Apply phone</NavLink>
                </li>
                <li>Price: {money(product.price)}</li>
                {
                    product.old_price ? (<li>Old Price: <s className="text-danger">{money(product.old_price)}</s></li>) : null
                }
                <li>Quantity: ({item.quantity})</li>
            </ul>
            <div className="bagsummary-btn">
                <div className="btn-btn">
                    <button type="button">
                        <FontAwesomeIcon onClick={() => quantityToggle(index, -1)} className="icon"  icon={faMinus} />
                    </button>
                    <button type="button">
                        <FontAwesomeIcon onClick={() => quantityToggle(index, 1)} className="icon"  icon={faPlus} />
                    </button>
                </div>
                <button type="button" onClick={() => CartModalToggle(true, item._id)} className="btn-trash">
                    <FontAwesomeIcon className="icon-trash"  icon={faTrashCan} />
                </button>
            </div>
        </div>
    )
}






const EmptyCart = () => {
    return (
        <div className="empty-shopping-cart checkout">
            <div className="cart-items-body">
                <img src={cart_img('1.png')} alt=""/>
                <div className="title-header"><h3>Empty Shopping Cart</h3></div>
                <NavLink to="/" className="cart-button">
                    Continue shopping
                    <FontAwesomeIcon className="icon"  icon={faArrowRightLong} />
                </NavLink>
            </div>
        </div>
    )
}
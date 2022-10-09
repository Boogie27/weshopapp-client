
import { NavLink, useSearchParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faArrowRightLong,
    faArrowDownLong,
} from '@fortawesome/free-solid-svg-icons'

import { 
    money,
    cart_img,
    product_img,
} from '../../Data'
import Moment from 'moment';
import Preloader from '../preloader/Preloader'




const FloatShoppingCart = ({cart, floatCartState, floatCartStateToggle}) => {
    
    return (
        <div className="shopingcart-float">
            <div onClick={() => floatCartStateToggle(false)} className={`float-dark-skin ${floatCartState ? 'active' : ''}`}></div>
            <div className={`shopingcart-float-body ${floatCartState ? 'active' : ''}`}>
                <div className="close-icon">
                    <FontAwesomeIcon onClick={() => floatCartStateToggle(false)} className="icon right"  icon={faArrowRightLong} />
                    <FontAwesomeIcon onClick={() => floatCartStateToggle(false)} className="icon down"  icon={faArrowDownLong} />
                </div>
                <div className="title-header">
                    <h3>Shopping Cart</h3>
                    <p>({cart.length}) Items</p>
                </div>
                    {
                        cart.length == 0 ? (<EmptyCart floatCartStateToggle={floatCartStateToggle}/>) : (
                            <>
                                <div className="shoppingcart-float-frame">
                                {cart.map((item, index) => <CartFloatItems key={index} item={item} floatCartStateToggle={floatCartStateToggle}/>)}
                                </div>
                                <CartFloatTotal floatCartStateToggle={floatCartStateToggle}/>
                            </>
                        )
                    }
               
            </div>
        </div>
    )
}




export default FloatShoppingCart












const CartFloatItems = ({item, floatCartStateToggle}) => {
    const is_available = item.product.quantity > 0 ? true : false
    const date = Moment(item.created_at).format('MMM Do YY')

    return (
        <div className="shoppingcart-float-items">
            <div className="cart-float-left">
                <NavLink onClick={() => floatCartStateToggle(false)} to={`/detail?product=${ item.product._id }&category=${ item.product.category }`}>
                    <img src={product_img(item.product.image[0])} alt={item.product.product_name}/>
                </NavLink>
            </div>
            <div className="cart-float-right">
                <ul>
                    <li className="name">
                        <NavLink onClick={() => floatCartStateToggle(false)} to={`/detail?product=${ item.product._id }&category=${ item.product.category }`}>
                            {item.product.product_name}
                        </NavLink>
                    </li>
                    <li><b>Price: </b>{money(item.product.price)}</li>
                    <li className="quantity">
                        <b>Quantity: </b>{item.quantity} 
                        <span className={`${!is_available ? 'active' : ''}`}>{!is_available ? 'Out of stock' : 'Available'}</span>
                    </li>
                    <li><b>Added on: </b> <span className="added-on">{date}</span></li>
                </ul>
            </div>
        </div>
    )
}






const CartFloatTotal = ({floatCartStateToggle}) => {
    return (
        <div className="float-cart-total">
            <div className="checkout"><NavLink onClick={() => floatCartStateToggle(false)} to="/checkout">Check out</NavLink></div>
            <div className="shopping-cart-link">
                <NavLink onClick={() => floatCartStateToggle(false)} to="/cart">
                    Goto Shopping cart
                    <FontAwesomeIcon className="icon"  icon={faArrowRightLong} />
                </NavLink>
            </div>
        </div>
    )
}







const EmptyCart = ({floatCartStateToggle}) => {
    return (
        <div className="empty-cart-float">
           <div className="empty-float-cart-body">
                <img src={cart_img('1.png')} alt="empty-cart"/>
                <p>You Cart is empty</p>
                <NavLink onClick={() => floatCartStateToggle(false)} to="/">
                    Continue Shopping
                    <FontAwesomeIcon className="icon"  icon={faArrowRightLong} />
                </NavLink>
           </div>
        </div>
    )
}
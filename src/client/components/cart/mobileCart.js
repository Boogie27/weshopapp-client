import { NavLink, useSearchParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPlus,
    faMinus,
    faHeart,
    faTrashCan,
    faArrowRightLong,
} from '@fortawesome/free-solid-svg-icons'

import { 
    logo,
    money,
    product_img,
} from '../../Data'
import Moment from 'moment';
import Preloader from '../preloader/Preloader'







const MobileShoppingCart = ({cart, CartModalToggle, quantityToggle, setQuantity}) => {
    return (
        <div className="m-shopping-cart">
            <div className="title-header">
                <h3>Shopping Cart</h3>
                <p>({cart.length}) Items</p>
            </div>
            <div className="m-shoppingcart-body">
                { cart.map((item, index) => <MobileShoppingCartItem index={index}
                        key={index} item={item} setQuantity={setQuantity}
                        quantityToggle={quantityToggle} CartModalToggle={CartModalToggle}
                    /> )
                }
            </div>
            <Subtotal cart={cart}/>
            <Buttons />
        </div>
    )
}


export default MobileShoppingCart










const MobileShoppingCartItem = ({item, index, setQuantity, quantityToggle, CartModalToggle}) => {
    const is_available = item.product.quantity > 0 ? true : false
    const date = Moment(item.created_at).format('MMM Do YY')

    return (
        <div className="m-cart-item">
            <div className="delete-icon">
                <FontAwesomeIcon className="icon text-danger"  icon={faHeart} />
                <FontAwesomeIcon onClick={() => CartModalToggle(true, item._id)} className="icon"  icon={faTrashCan} />
            </div>
            <div className="m-cart-left">
                <NavLink to={`/detail?product=${ item.product._id }&category=${ item.product.category }`}>
                    <img src={product_img(item.product.image[0])} alt={item.product.product_name}/>
                </NavLink>
            </div>
            <div className="m-cart-right">
                <ul>
                    <li><span className="name">{item.product.product_name}</span></li>
                    <li><b>Price: </b>{money(item.product.price)}</li>
                    <li><b>Availability: </b>
                        <span className={`is-available ${!is_available ? 'active' : ''}`}>
                            {!is_available ? 'Out of stock' : 'Available'}
                        </span>
                    </li>
                    <li><b>Added on:</b> <span className="added-on">{date}</span></li>
                    <li>
                        <div className="m-cart-quantity">
                            <span><b>Qty:</b> </span>
                            <button onClick={() => quantityToggle(index, -1)}>
                                <FontAwesomeIcon className="icon"  icon={faMinus} />
                            </button>
                            <input type="text" onChange={(e) => setQuantity(e.target.value)} value={item.quantity}/>
                            <button onClick={() => quantityToggle(index, 1)}>
                                <FontAwesomeIcon className="icon"  icon={faPlus} />
                            </button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}









const Subtotal = ({cart}) => {
    let subTotal = 0
    const item = cart.map((x) => {
        subTotal = subTotal + x.price
    })

    return (
        <div className="cart-sub-total">
            <ul>
                <li className="title">Sub total </li>
                <li>
                    <b className="sub-total">{money(subTotal)}</b>
                    <p>Total of all your cart items</p>
                </li>
            </ul>
        </div>
    )
}






const Buttons = () => {
    return (
        <div className="m-cart-page-button">
            <ul>
                <li>
                    <div className="checkout">
                        <NavLink to="/checkout">Check out</NavLink>
                    </div>
                </li>
                <li>
                    <button><img src={logo('paypal.png')} alt=""/></button>
                </li>
                <li>
                    <NavLink to="/" className="continue-shopping">
                        Continue shopping 
                        <FontAwesomeIcon className="icon"  icon={faArrowRightLong} />
                    </NavLink>
                </li>
            </ul>
        </div>
    )
}


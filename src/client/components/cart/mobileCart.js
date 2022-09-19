import { NavLink, useSearchParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faPlus,
    faMinus,
    faHeart,
    faTrashCan,
} from '@fortawesome/free-solid-svg-icons'

import { 
    url, 
    money,
    product_img,
} from '../../Data'
import Preloader from '../preloader/Preloader'







const MobileShoppingCart = () => {
    return (
        <div className="m-shopping-cart">
            <div className="title-header">
                <h3>Shopping Cart</h3>
                <p>(3) Items</p>
            </div>
            <div className="m-shoppingcart-body">
                <MobileShoppingCartItem />
                <MobileShoppingCartItem />
            </div>
        </div>
    )
}


export default MobileShoppingCart










const MobileShoppingCartItem = () => {
    return (
        <div className="m-cart-item">
            <div className="delete-icon">
                <FontAwesomeIcon className="icon text-danger"  icon={faHeart} />
                <FontAwesomeIcon className="icon"  icon={faTrashCan} />
            </div>
            <div className="m-cart-left">
                <img src={product_img('1.jpg')} alt=""/>
            </div>
            <div className="m-cart-right">
                <ul>
                    <li><b>Name: </b>Iphon</li>
                    <li><b>Price: </b>{money(1000)}</li>
                    <li><b>Availability: </b><span className="is-available">Out of stock</span></li>
                    <li><b>Added on:</b> <span className="added-on">20 march 2022</span></li>
                    <li>
                        <div className="m-cart-quantity">
                            <span><b>Qty:</b> </span>
                            <button><FontAwesomeIcon className="icon"  icon={faMinus} /></button>
                            <input type="text" />
                            <button><FontAwesomeIcon className="icon"  icon={faPlus} /></button>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}
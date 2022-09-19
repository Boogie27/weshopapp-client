
import React, { useState, useEffect  } from 'react'
import { NavLink, useSearchParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faHeart,
    faXmark,
    faTrashCan,
    faCartShopping,
    faArrowRightLong,
} from '@fortawesome/free-solid-svg-icons'
import { 
    money,
    product_img, 
} from '../../Data'
import Moment from 'moment';





const MobileWishList = ({wishlist, isActiveMobileWishlist, mobileWhislistToggle, wishlistItemsToggle, addProductToCart, modalToggle}) => {
    const is_active = isActiveMobileWishlist ? 'active' : ''
    return (
        <div className="mobile-wishlist-container">
            <div className="mw-page-links">
                <div className="title-header"><h3>My Wishlist</h3></div>
                <ul>
                    <li>
                        <button onClick={() => mobileWhislistToggle(true)}>
                            <FontAwesomeIcon className="icon"  icon={faHeart} />
                            Show Wishlist
                        </button>
                    </li>
                    <li>
                        <NavLink to="/">
                        Continue to Product
                        <FontAwesomeIcon className="icon"  icon={faArrowRightLong} />
                        </NavLink></li>
                </ul>
            </div>
            <div onClick={() => mobileWhislistToggle(false)} className={`mw-dark-skin ${is_active}`}></div>
            <div className={`mw-body ${is_active}`}>
                <div className="mw-close-form"><FontAwesomeIcon onClick={() => mobileWhislistToggle(false)} className="icon"  icon={faXmark} /></div>
                <div className="title-header">
                    <h3>Wishlist</h3>
                    <p>Items ({wishlist.length})</p>
                </div>
                <div className="mw-body-frame">
                    {wishlist.map((item, index) => <MobileWishlistItem key={index} item={item}/> )}
                </div>
                <div className="mw-buttom">
                    <div className="mw-buttom-left"><b>Total: <span>{money(1000)}</span></b></div>
                    <div className="mw-buttom-right">
                        <FontAwesomeIcon className="icon"  icon={faCartShopping} />
                        <FontAwesomeIcon className="icon"  icon={faTrashCan} />
                    </div>
                </div>
            </div>
        </div>
    )
}






const MobileWishlistItem = ({item}) => {
    const is_available = item.product.quantity > 0 ? true : false
    const date = Moment(item.created_at).format('MMM Do YY')
    return (
        <div className="mw-item-body">
            <div className="mw-image">
            <NavLink to={`/detail?product=${item.product._id}&category=${item.product.category}`}>
                    <img src={product_img(item.product.image[0])} alt={item.product.product_name}/>
                </NavLink>
            </div>
            <ul className="ul-mw-content">
                <li className="mw-content-name">
                    <NavLink to={`/detail?product=${item.product._id}&category=${item.product.category}`}>
                        Iphone
                    </NavLink>
                </li>
                <li><b>Price:</b> {money(item.product.price)}</li>
                <li><b>Availability:</b> <span className={`availability ${is_available ? 'active' : ''}`}>{is_available ? 'Available' : 'Out of stock'}</span></li>
                <li><b>Added on: </b><span className="added-on">{date}</span></li>
                <li>
                    <div className="action-button">
                        <FontAwesomeIcon className="icon"  icon={faCartShopping} />
                        <FontAwesomeIcon className="icon"  icon={faTrashCan} />
                    </div>
                </li>
            </ul>
        </div>
    )
}




export default MobileWishList
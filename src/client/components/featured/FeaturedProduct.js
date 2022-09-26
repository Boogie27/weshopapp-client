import React, { useRef, useState, useEffect } from 'react'
import { NavLink, useSearchParams  } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faEye,
  faStar,
  faHeart,
  faCartShopping
} from '@fortawesome/free-solid-svg-icons'
import { url, userImageURL, page_url, money, productImageURL} from '../../Data'
import FeaturedFloatItems from './FeaturedFloatItems'









const FeaturedProduct = ({user, scrollToTop,  addToWishlist, addToCart, featuredProduct, showQuickView}) => {
 const is_available = featuredProduct.quantity > 0 ? true : false


 const addProductToCart = () => {
  const item = {
    product_id: featuredProduct._id,
    quantity: 1,
    price: featuredProduct.price
  }
  return addToCart(item)
}

const addItemToWishList = () => {
  const item = {
    user_id: user._id,
    product_id: featuredProduct._id,
    old_url: page_url()
  }
  return addToWishlist(item)
}
 
 return (
      <div className="latest-p-container">
        <div className="latest-p-item">
          <div className="latest-p-img">
            <NavLink onClick={() => scrollToTop()} to={`/detail?product=${featuredProduct._id}&category=${featuredProduct.category}`}>
              <img src={productImageURL + featuredProduct.image[0]} alt={featuredProduct.product_name} />
            </NavLink>
          </div>
          <div className="latest-p-text">
            <ul>
              <li className="product-name">
                <NavLink onClick={() => scrollToTop()} to={`/detail?product=${featuredProduct._id}&category=${featuredProduct.category}`}>
                {featuredProduct.product_name}
                </NavLink>
              </li>
              <li className="product-price"><b>Price:</b> {money(featuredProduct.price)}</li>
              <li className={`is-available ${!is_available && 'active'}`}>
                <b>Availability: </b>
                <span>{!is_available ? 'Out of stock' : 'Available'}</span>
              </li>
              <li className="latest-pb-button">
                <ProductLinksOne addItemToWishList={addItemToWishList} showQuickView={showQuickView} addProductToCart={addProductToCart} featuredProduct={featuredProduct}/>
              </li>
            </ul>
          </div>
          <div className="float-item-container">
            <FeaturedFloatItems user={user} scrollToTop={scrollToTop} addToWishlist={addToWishlist} featuredProduct={featuredProduct} showQuickView={showQuickView}/>
          </div>
        </div>
        <div className="product-link-two">
          <ProductLinksTwo addToWishlist={addToWishlist} showQuickView={showQuickView} featuredProduct={featuredProduct}/>
        </div>
      </div>
  )
}
  
  
  
  
  
  
export default FeaturedProduct










const ProductLinksOne = ({addItemToWishList, addProductToCart, showQuickView, addToWishlist, featuredProduct}) => {

  return (
    <>
      <div className="stars">
        <span><b>Ratings:</b> </span>
        <FontAwesomeIcon className="star active"  icon={faStar} />
        <FontAwesomeIcon className="star active"  icon={faStar} />
        <FontAwesomeIcon className="star active"  icon={faStar} />
        <FontAwesomeIcon className="star"  icon={faStar} />
        <FontAwesomeIcon className="star"  icon={faStar} />
      </div>
      <div className="cart-icon">
        <FontAwesomeIcon className="icon wishlist" onClick={() => addItemToWishList()} icon={faHeart} />
        <FontAwesomeIcon className="icon" onClick={() => showQuickView(featuredProduct)} icon={faEye} />
        <FontAwesomeIcon className="icon"  onClick={() => addProductToCart()} icon={faCartShopping} />
      </div>
    </>
  )
}
  
  
  
  
  
  
const ProductLinksTwo = ({addToWishlist, showQuickView, featuredProduct }) => {
  return (
    <div className="product-link-body">
      <div className="cart-icon"><FontAwesomeIcon icon={faHeart} /></div>
      <div className="cart-icon"><FontAwesomeIcon  onClick={() => showQuickView(featuredProduct)} icon={faEye} /></div>
      <div className="cart-icon"><FontAwesomeIcon  icon={faCartShopping} /></div>
    </div>
  )
}
  
  
  
  
  
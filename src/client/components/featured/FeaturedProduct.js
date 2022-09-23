import React, { useRef, useState, useEffect } from 'react'
import { NavLink, useSearchParams  } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
  faEye,
  faStar,
  faHeart,
  faCartShopping
} from '@fortawesome/free-solid-svg-icons'
import { url, userImageURL, money, productImageURL} from '../../Data'
import FeaturedFloatItems from './FeaturedFloatItems'









const FeaturedProduct = ({user,scrollToTop,  addToWishlist, addToCart, featuredProduct, showQuickView}) => {

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
              <li className="product-desc">
                <NavLink onClick={() => scrollToTop()} to={`/detail?product=${featuredProduct._id}&category=${featuredProduct.category}`}>
                  {featuredProduct.product_desc.substr(1, 80) + '...'}
                </NavLink>
              </li>
              <li className="product-price">{money(featuredProduct.price)}</li>
              <li className="latest-pb-button">
                <ProductLinksOne addToWishlist={addToWishlist} addToCart={addToCart} featuredProduct={featuredProduct}/>
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










const ProductLinksOne = ({addToCart, featuredProduct}) => {

  const addProductToCart = () => {
    const item = {
      product_id: featuredProduct._id,
      quantity: 1,
      price: featuredProduct.price
    }
    return addToCart(item)
  }


  return (
    <>
      <div className="stars">
        <FontAwesomeIcon className="star active"  icon={faStar} />
        <FontAwesomeIcon className="star active"  icon={faStar} />
        <FontAwesomeIcon className="star active"  icon={faStar} />
        <FontAwesomeIcon className="star"  icon={faStar} />
        <FontAwesomeIcon className="star"  icon={faStar} />
      </div>
      {/* add to shopping cart */}
      <div className="cart-icon"><FontAwesomeIcon  onClick={() => addProductToCart()} icon={faCartShopping} /></div>
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
  
  
  
  
  
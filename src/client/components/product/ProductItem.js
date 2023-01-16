import React, { useState, useEffect, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faStar,
  faHeart,
  faCartShopping
} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { money, url, page_url, product_img } from '../../Data'






const ProductItem = ({user, index, addToCart, product, addToWishlist, showQuickView, scrollToTop}) => {

  const addItemToWishList = () => {
    const item = {
      user_id: user._id,
      product_id: product._id,
      old_url: page_url()
    }
    return addToWishlist(item)
  }

  const addProductToCart = () => {
    const item = {
      product_id: product._id,
      quantity: 1,
      price: product.price
    }
    return addToCart(item)
  }

  return (
    <ProductContainer index={index} addProductToCart={addProductToCart} addItemToWishList={addItemToWishList} showQuickView={showQuickView} product={product} scrollToTop={scrollToTop}/>
  )
}



export default ProductItem










const ProductContainer = ({product, index, addProductToCart, addItemToWishList, showQuickView, scrollToTop}) => {
  const [is_floatImage, setIs_floatImage] = useState(false)

  const floatImageScreen = (string) => {
      setIs_floatImage(string)
  }

  const borderless = index % 2 == 0 ? false : true
  
  return (
      <div className={`product-component ${!borderless ? 'borderless' : ''}`}
          onMouseEnter={() => floatImageScreen(true)} onMouseLeave={() => floatImageScreen(false)}>
          <ProductImage product={product} addProductToCart={addProductToCart} addItemToWishList={addItemToWishList} showQuickView={showQuickView} scrollToTop={scrollToTop} is_floatImage={is_floatImage}/>
          <ProductDetail product={product} scrollToTop={scrollToTop}/>
          <BottomIconLarge addProductToCart={addProductToCart} addItemToWishList={addItemToWishList} showQuickView={showQuickView} product={product}/>
      </div>
  )
}





const ProductImage = ({product, addItemToWishList, addProductToCart, showQuickView, scrollToTop, is_floatImage}) => {
  const image = product.image

  return (
      <div className={`product-image-comp ${is_floatImage && 'active'}`}>
          <div className="product-comp-img">
              <NavLink onClick={() => scrollToTop()} to={`/detail?product=${product._id}&category=${product.category}`}>
                  <img src={product_img(image[0])} alt=""/>
              </NavLink>
          </div>
          {
              image.length > 1 ? (
                  <div className="float-product-comp-img">
                      <NavLink onClick={() => scrollToTop()} to={`/detail?product=${product._id}&category=${product.category}`}>
                          <img src={product_img(image[1])} alt=""/>
                      </NavLink>
                  </div>
              ) : null
          }
          <div className="float-product-icon">
              <FontAwesomeIcon onClick={() => showQuickView(product)} className="icon"  icon={faEye} />
              <FontAwesomeIcon onClick={() => addItemToWishList()} className="icon text-danger"  icon={faHeart} />
              <FontAwesomeIcon onClick={() => addProductToCart()} className="icon"  icon={faCartShopping} />
          </div>
      </div>
  )
}





const ProductDetail = ({product, scrollToTop}) => {
  const text = product.product_desc
  const description = text.substr(0, 80);
  // const description = 'hello hwo are you'

  return (
      <div className="product-comp-detail">
          <ul>
              <li>
                  <NavLink onClick={() => scrollToTop()} to={`/detail?product=${product._id}&category=${product.category}`}>
                      {product.product_name}
                  </NavLink>
              </li>
              <li><b>Price: </b>{money(product.price)} </li>
              <li><b>Old Proice: </b><s className="text-danger">{money(product.old_price)}</s></li>
              <li><p>{description}</p></li>
          </ul>
      </div>
  )
}





const BottomIconLarge = ({product, addProductToCart, showQuickView, addItemToWishList}) => {
  return (
      <div className="bottom-icons-large">
          <div className="stars">
              <FontAwesomeIcon className="star active"  icon={faStar} />
              <FontAwesomeIcon className="star active"  icon={faStar} />
              <FontAwesomeIcon className="star active"  icon={faStar} />
              <FontAwesomeIcon className="star"  icon={faStar} />
              <FontAwesomeIcon className="star"  icon={faStar} />
          </div>
          <div className="product-shop-icons">
              <FontAwesomeIcon onClick={() => showQuickView(product)}className="icon quick-v"  icon={faEye} />
              <FontAwesomeIcon onClick={() => addItemToWishList()} className="icon wislist"  icon={faHeart} />
              <FontAwesomeIcon onClick={() => addProductToCart()} className="icon shopping-cart"  icon={faCartShopping} />
          </div>
      </div>
  )
}

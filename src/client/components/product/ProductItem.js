import React, { useState, useEffect, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faStar,
  faHeart,
  faCartShopping
} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import { money, url, product_img } from '../../Data'

const ProductItem = ({index, product, scrollToTop}) => {
  return (
    <ProductContainer index={index} product={product} scrollToTop={scrollToTop}/>
  )
}



export default ProductItem










const ProductContainer = ({product, index, scrollToTop}) => {
  const [is_floatImage, setIs_floatImage] = useState(false)

  const floatImageScreen = (string) => {
      setIs_floatImage(string)
  }

  const borderless = index % 2 == 0 ? false : true
  
  return (
      <div className={`product-component ${!borderless ? 'borderless' : ''}`}
          onMouseEnter={() => floatImageScreen(true)} onMouseLeave={() => floatImageScreen(false)}>
          <ProductImage product={product} scrollToTop={scrollToTop} is_floatImage={is_floatImage}/>
          <ProductDetail product={product} scrollToTop={scrollToTop}/>
          <BottomIconLarge/>
      </div>
  )
}





const ProductImage = ({product, scrollToTop, is_floatImage}) => {
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
              <FontAwesomeIcon className="icon"  icon={faEye} />
              <FontAwesomeIcon className="icon text-danger"  icon={faHeart} />
              <FontAwesomeIcon className="icon"  icon={faCartShopping} />
          </div>
      </div>
  )
}





const ProductDetail = ({product, scrollToTop}) => {
  const text = product.product_desc
  // const description = text.substr(0, 80);
  const description = 'hello hwo are you'

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





const BottomIconLarge = () => {
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
              <FontAwesomeIcon className="icon quick-v"  icon={faEye} />
              <FontAwesomeIcon className="icon wislist"  icon={faHeart} />
              <FontAwesomeIcon className="icon shopping-cart"  icon={faCartShopping} />
          </div>
      </div>
  )
}

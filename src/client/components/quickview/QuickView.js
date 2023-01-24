import React, { useState, Fragment } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faHeart,
  faXmark,
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import { money, url, page_url, product_img } from '../../Data'






const QuickView = ({ user, product, addToCart, addToWishlist, alertError, closeQuickView}) => {
    const [searchParams] = useSearchParams();
    const token = Cookies.get('weshopappuser')
    const [quantity, setQuantity] = useState(1)
    const product_image = product.image
    const [counter, setCounter] = useState(1)
    const [sliderImage, setSliderImage] = useState(product_image[0])
    

    const prevSLideImage = () => {
        if(counter <= 0){
            setCounter(product_image.length - 1)
        }else{
            setCounter(counter - 1)
        }
        setSliderImage(product_image[counter])
    }

    const nextSLideImage = () => {
        if(counter >= product_image.length - 1){
            setCounter(0)
        }else{
            setCounter(counter + 1)
        }
        setSliderImage(product_image[counter])
    }


    // add item to cart
    const addItemToCart = () => {
        let current_url = page_url()
        Cookies.set('current_url', current_url, { expires: 1 })

        const item = {
            product_id: product._id,
            quantity: quantity,
            price: product.price,
            // user_id: user._id,
            old_url: current_url,
          }
        return addToCart(item)
    }



    // add product to wishslist
    const addItemToWishList = () => {
        let current_url = page_url()
        Cookies.set('current_url', current_url, { expires: 1 })
        const item = {
            user_id: user._id,
            product_id: product._id,
            old_url: current_url,
        }
        addToWishlist(item)
    }


    return (
        <div className="quickview-container">
            <div onClick={closeQuickView} className="qv-dark-skin"></div>
            <div className="quick-view">
                <div className="cancle-btn">
                    <FontAwesomeIcon className="cancel-icon" onClick={closeQuickView}  icon={faXmark} />
                </div>
                <div className="quick-view-inner">
                    <QuickViewImage sliderImage={sliderImage} nextSLideImage={nextSLideImage} prevSLideImage={prevSLideImage} product={product}/>
                    <div className="quick-view-detail">
                        <div className="title-header"><h4>{product.product_name}</h4></div>
                        <StarRatings/>
                        <Details product={product}/>
                        <AddProductToCart product={product} addItemToCart={addItemToCart} setQuantity={setQuantity} quantity={quantity} />
                        <WishListAdd addItemToWishList={addItemToWishList}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default QuickView









const QuickViewImage = ({product, nextSLideImage, prevSLideImage, sliderImage, setQuantity, quantity}) => {

    return (
        <div className="quick-view-img">
            <img src={ product_img(sliderImage)} alt={product.product_name}/>
            {
                product.image.length > 1 ? (
                    <div className="direction">
                        <FontAwesomeIcon onClick={() => prevSLideImage()} className="arrow"  icon={faArrowLeft} />
                        <FontAwesomeIcon onClick={() => nextSLideImage()} className="arrow"  icon={faArrowRight} />
                    </div>
                ) : null
            }
        </div>
    )
}





const StarRatings = () => {
    return (
        <div className="quick-view-stars">
            <span><b>Ratings:</b> </span>
            <FontAwesomeIcon className="star active"  icon={faStar} />
            <FontAwesomeIcon className="star active"  icon={faStar} />
            <FontAwesomeIcon className="star active"  icon={faStar} />
            <FontAwesomeIcon className="star"  icon={faStar} />
            <FontAwesomeIcon className="star"  icon={faStar} />
        </div>
    )
}





const Details = ({product}) => {
    return (
        <div className="qv-details">
            <ul>
                <li><b>Product Name: </b>{product.product_name}</li>
                <li><b>Product Price: </b>{money(product.price)}</li>
                <li><b>Old Price: </b> <s className="text-danger">{money(product.old_price)}</s></li>
                <li><b>Availability: </b><span className={`${!product.quantity && 'active'}`}>{product.quantity ? 'Product Instock' : 'Out Of Stock'}</span></li>
            </ul>
        </div>
    )
}







const AddProductToCart = ({product, quantity, setQuantity, addItemToCart}) => {
    const is_available = product.quantity > 0 ? true : false
   
    return (
        <div className="qv-addtocart">
            <label>QTY</label>
            <input onChange={(e) => setQuantity(e.target.value)} value={quantity} type="number" min={1}/>
            <Fragment>
                {
                    !is_available ? (
                        <button type="button" disabled>ADD TO CART</button>
                    ):(
                        <button onClick={() => addItemToCart()} type="button">ADD TO CART</button>
                    )
                }
            </Fragment>
        </div>
    )
}





const WishListAdd = ({addItemToWishList}) => {
    return (
        <div className="icons">
            <ul>
                <li onClick={() => addItemToWishList()}>
                    <FontAwesomeIcon className=""  icon={faHeart} />
                    <span> Add To Wishlist</span>
                </li>
            </ul>
        </div>
    )
}





import React, { useState, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faHeart,
  faXmark,
  faArrowRight,
  faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'
import { moneySign, productImageURL } from '../../Data'






const QuickView = ({product, addItemToWishList, closeQuickView}) => {

    return (
        <div className="quickview-container">
            <div onClick={closeQuickView} className="qv-dark-skin"></div>
            <div className="quick-view">
                <div className="cancle-btn">
                    <FontAwesomeIcon className="cancel-icon" onClick={closeQuickView}  icon={faXmark} />
                </div>
                <div className="quick-view-inner">
                    <QuickViewImage product={product}/>
                    <div className="quick-view-detail">
                        <div className="title-header"><h4>{product.product_name}</h4></div>
                        <StarRatings/>
                        <Details product={product}/>
                        <AddToCart product={product} />
                        <WishListAdd addItemToWishList={addItemToWishList}/>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default QuickView









const QuickViewImage = ({product}) => {
    
    const product_image = product.image
    const [counter, setCounter] = useState(1)
    const [addToCart, setAddToCart] = useState()
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

    return (
        <div className="quick-view-img">
            <img src={ productImageURL + sliderImage} alt={product.product_name}/>
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
                <li><b>Product Price: </b>{moneySign + product.price}</li>
                <li><b>Old Price: </b> <s>{moneySign + product.old_price}</s></li>
                <li><b>Availability: </b><span className={`${!product.quantity && 'active'}`}>{product.quantity ? 'Product Instock' : 'Out Of Stock'}</span></li>
            </ul>
        </div>
    )
}







const AddToCart = ({product, setAddToCart}) => {
    const is_available = product.quantity > 0 ? true : false
   
    return (
        <div className="qv-addtocart">
            <label>QTY</label>
            <input onChange={(e) => setAddToCart(e.target.value)} type="number" min={1}/>
            <Fragment>
                {
                    !is_available ? (
                        <button type="button" disabled>ADD TO CART</button>
                    ):(
                        <button type="button">ADD TO CART</button>
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
import React, { useState, useEffect, Fragment } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEye,
  faStar,
  faHeart,
  faCartShopping
} from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Axios from 'axios'
import { money, url, product_img } from '../../Data'
import Categories from './Categories'
import HeaderTop from './HeaderTop'
import ProductItem from './ProductItem'
import QuickView from '../quickview/QuickView'
import Preloader from '../preloader/Preloader' 






const Product = ({user, scrollToTop, showQuickView, addToCart, addToWishlist, categoryToggleBtn}) => {
    const [view, setView] = useState('grid')
    const [products, setProducts] = useState([])
    const [productLimit, setProductLimit] = useState('-')
    const [productAlphabet, setProductAlphabet] = useState('-')
    const [isLoading, setIsLoading] = useState({state: true, text: 'Fetching Products, Please Wait...'})

    
    useEffect(() => {
        fetchProducts()
        preloaderToggle(true, 'Fetching Products, Please Wait...')
    }, [])



    const fetchProducts = (item = null) => {
        Axios.get(url(`/api/fetch-products/`)).then((response) => {
            if(response.data.length){
                setProducts(response.data)
                return preloaderToggle(true, 'Fetching Products, Please Wait...', 1000)
            }
            setProducts('empty')
            return preloaderToggle(true, 'Fetching Products, Please Wait...', 1000)
        })
    }


    const productViewToggle = (type) => {
        setView(type)
    }


    
    // set and remove preloader
   const preloaderToggle = (state, text, time = null) => {
    setIsLoading({state: state, text: text})
    if(time){
        setTimeout(() => {
            setIsLoading({state: false, text: ''})
        }, time)
    }
  }

  const getLimit = (e) => {
        let value = '-'
        const limit = parseInt(e.target.value)
        if(Number.isInteger(limit))
        {
            value = parseInt(e.target.value)
        }
      
        setProductLimit(value)
        fetchSortedProduct({limit: value, alphabet: productAlphabet})
  }


    const getAlphabet = (e) => {
        const value = e.target.value
        setProductAlphabet(value)
        fetchSortedProduct({limit: productLimit, alphabet: value})
    }



    const fetchSortedProduct = (value) => {
        Axios.get(url(`/api/fetch-products-by-sorting/${value.alphabet}/${value.limit}`)).then((response) => {
            setProducts(response.data)
        })
    }




    return (
        <div className="product-page-container">
            <div className="title-header top"><h3>Products</h3></div>
            <HeaderTop view={view}  getLimit={getLimit} getAlphabet={getAlphabet} productViewToggle={productViewToggle} categoryToggleBtn={categoryToggleBtn}
                 setProductLimit={setProductLimit} productLimit={productLimit}  setProductAlphabet={setProductAlphabet} productAlphabet={productAlphabet}
            />
            {isLoading.state ? (<Preloader text={isLoading.text}/>) : (
                <Fragment>
                    {
                        products == 'empty' ? (<div className="empty-product">There are no products available</div>) : (
                            <ProductBody user={user} showQuickView={showQuickView} products={products} addToWishlist={addToWishlist} addToCart={addToCart} view={view} scrollToTop={scrollToTop}/>
                        )
                    }
                </Fragment>
            )}
        </div>
    )
}





export default Product







const ProductBody = ({user, products, addToCart, showQuickView, addToWishlist, view, scrollToTop}) => {
    return (
        <div className={`product-body-container ${view == 'list' ? 'list' : ''}`}>
        {
            products.length == 0 ? (<EmptyProduct text={'Product is Empty'}/>) : (
                <Row className="show-grid">
                    {products.map((product, index) => (
                        <Fragment key={index}>{
                            product.image.length ? <Col className="column" key={index} xs={6} sm={6} md={4} lg={3} xl={3}><ProductItem index={index} showQuickView={showQuickView} user={user} addToCart={addToCart} addToWishlist={addToWishlist} product={product} scrollToTop={scrollToTop}/></Col> : null
                        }</Fragment>
                    ))}
                </Row>
            )
        }
        </div>
    )
}




const EmptyProduct = ({text}) => {
    return (
        <div className="empty-product">
            <h3>{text}</h3>
        </div>
    )
}
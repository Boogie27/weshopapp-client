import React, { useState, useEffect } from 'react'
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







const Product = ({scrollToTop}) => {
    const [view, setView] = useState('grid')
    const [products, setProducts] = useState([])


    useEffect(() => {
        fetchProducts()
    }, [])



    const fetchProducts = (item = null) => {
        Axios.get(url(`/api/fetch-products/`)).then((response) => {
            setProducts(response.data)
        })
    }
    const productViewToggle = (type) => {
        console.log(type)
    }


    return (
        <div className="product-page-container">
            <div className="title-header top"><h3>Products</h3></div>
            <HeaderTop productViewToggle={productViewToggle}/>
            <ProductBody products={products} scrollToTop={scrollToTop}/>
        </div>
    )
}





export default Product







const ProductBody = ({products, scrollToTop}) => {
    return (
        <div className="product-body-container">
            <Row className="show-grid">
                {products.map((product, index) => <Col key={index} xs={12} sm={6} md={4} lg={3} xl={3}><ProductContainer product={product} scrollToTop={scrollToTop}/></Col>)}
            </Row>
        </div>
    )
}






const ProductContainer = ({product, scrollToTop}) => {
    const [is_floatImage, setIs_floatImage] = useState(false)
  
    const floatImageScreen = (string) => {
        setIs_floatImage(string)
    }

    
    return (
        <div className="product-component"
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
    const description = text.substr(0, 80);

    return (
        <div className="product-comp-detail">
            <ul>
                <li>
                    <NavLink onClick={() => scrollToTop()} to={`/detail?product=${product._id}&category=${product.category}`}>
                        {product.name}
                    </NavLink>
                </li>
                <li><b>Price: </b>{product.price} </li>
                <li><b>Old Proice: </b><s className="text-danger">{product.old_price}</s></li>
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
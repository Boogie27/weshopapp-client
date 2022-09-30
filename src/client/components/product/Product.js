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
import { money, product_img } from '../../Data'
import Categories from './Categories'
import HeaderTop from './HeaderTop'







const Product = () => {
    const [view, setView] = useState('grid')


    const productViewToggle = (type) => {
        console.log(type)
    }


    return (
        <div className="product-page-container">
            <div className="title-header top"><h3>Products</h3></div>
            <HeaderTop productViewToggle={productViewToggle}/>
            <ProductBody/>
        </div>
    )
}





export default Product







const ProductBody = () => {
    return (
        <div className="product-body-container">
            <Row className="show-grid">
                <Col xs={12} sm={12} md={4} lg={3}>
                    <div className="product-component">
                        <ProductImage/>
                        <ProductDetail/>
                        <BottomIconLarge/>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={4} lg={3}>
                    <div className="product-component">
                        <ProductImage/>
                        <ProductDetail/>
                        <BottomIconLarge/>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={4} lg={3}>
                    <div className="product-component">
                        <ProductImage/>
                        <ProductDetail/>
                        <BottomIconLarge/>
                    </div>
                </Col>
                <Col xs={12} sm={12} md={4} lg={3}>
                    <div className="product-component">
                        <ProductImage/>
                        <ProductDetail/>
                        <BottomIconLarge/>
                    </div>
                </Col>
            </Row>
        </div>
    )
}





const ProductImage = () => {
    return (
        <div className="product-image-comp">
            <div className="product-comp-img">
                <NavLink to="/">
                    <img src={product_img('1.jpg')} alt=""/>
                </NavLink>
            </div>
            <div className="float-product-comp-img">
                <NavLink to="/">
                    <img src={product_img('2.jpg')} alt=""/>
                </NavLink>
            </div>
            <div className="float-product-icon">
                <FontAwesomeIcon className="icon"  icon={faEye} />
                <FontAwesomeIcon className="icon text-danger"  icon={faHeart} />
                <FontAwesomeIcon className="icon"  icon={faCartShopping} />
            </div>
        </div>
    )
}





const ProductDetail = () => {
    const text = 'is defined but is defined but never used is defined but never used'
    const description = text.substr(0, 100);

    return (
        <div className="product-comp-detail">
            <ul>
                <li>
                    <NavLink to="/">Iphone</NavLink>
                </li>
                <li><b>Price: </b>{money(1000)} </li>
                <li><b>Old Proice: </b><s className="text-danger">{money(2000)}</s></li>
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
                <FontAwesomeIcon className="icon"  icon={faEye} />
                <FontAwesomeIcon className="icon text-danger"  icon={faHeart} />
                <FontAwesomeIcon className="icon"  icon={faCartShopping} />
            </div>
        </div>
    )
}
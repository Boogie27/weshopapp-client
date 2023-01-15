import React, { useState, useEffect } from 'react'
import { NavLink, useSearchParams  } from 'react-router-dom'
import FeaturedProduct from '../featured/FeaturedProduct'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ProductItem from '../product/ProductItem';





const RelatedProducts = ({user, scrollToTop, addToCart, addToWishlist, relatedProducts, showQuickView}) => {

    return (
        <div className="product-conatiner related-product">
            <div className="title-header"><h4>RELATED PRODUCTS</h4></div>
            <div className={`product-body-container`}>
                <Row className="show-grid">
                {
                    relatedProducts.map((product, index) => (
                    <Col className="column" key={product._id} xs={12} sm={12} md={4} lg={3}>
                    {
                        product.image.length > 0 ? ( <ProductItem index={index} user={user} addToCart={addToCart} scrollToTop={scrollToTop} addToWishlist={addToWishlist} showQuickView={showQuickView} product={product}/> ) : null
                    }
                    </Col>
                    )) 
                }
                </Row>
            </div>
            </div>
    )
}


export default RelatedProducts
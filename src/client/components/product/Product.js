import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faStar,
  faHeart,
  faList,
  faGripVertical
} from '@fortawesome/free-solid-svg-icons'
import { money, product_img } from '../../Data'
import Categories from './Categories'







const Product = () => {
    const [view, setView] = useState('grid')


    const productViewToggle = (type) => {
        console.log(type)
    }
    return (
        <div className="product-page-container">
            <div className="title-header top"><h3>Products</h3></div>
            <div className="product-top-bar">
                <div className="topbar-left">
                    <FontAwesomeIcon onClick={() => productViewToggle('grid')} className="icon"  icon={faGripVertical} />
                    <FontAwesomeIcon onClick={() => productViewToggle('list')} className="icon"  icon={faList} />
                    <span className="">Categories</span>
                </div>
                <div className="topbar-right">
                    <ul>
                        <li>
                            <span>Sort By:</span> 
                            <select className="name">
                                <option>Default</option>
                                <option>Name (A - Z)</option>
                                <option>Name (Z - A)</option>
                            </select>
                        </li>
                        <li>
                            <span>Show:</span> 
                            <select className="number">
                                <option>Select</option>
                                <option>20</option>
                                <option>40</option>
                                <option>60</option>
                                <option>80</option>
                                <option>100</option>
                            </select>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}





export default Product
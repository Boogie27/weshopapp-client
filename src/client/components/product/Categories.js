import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faXmark,
    faAngleUp,
    faAngleDown,
} from '@fortawesome/free-solid-svg-icons'




const Categories = ({categories, categoryToggleBtn, scrollToTop}) => {
    const [isActive, setIsActive ] = useState({index: null, clicked: false})

    const toggleCategories = (index) => {
        if(isActive.clicked == true && isActive.index == index){
            setIsActive({index: null, clicked: false})
        }else{
            setIsActive({index: index, clicked: true})
        }
    }


    return (
        <div className="category-container">
            <div className="category-body-container">
                <div className="category-body">
                    <div className="title-header">
                        <h3>Catego<span className="text-warning">ries</span></h3>
                        <FontAwesomeIcon  onClick={() => categoryToggleBtn()} className="icon"  icon={faXmark} />
                    </div>
                    <div className="product-categories">
                        <ul>
                            {
                                categories.map((category, index) => (<>
                                    <li className="cat-main"><CategoriesChild key={index} index={index} category={category} scrollToTop={scrollToTop} isActive={isActive} toggleCategories={toggleCategories}/></li>
                                </>))
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}





export default Categories














const CategoriesChild = ({index, category, toggleCategories, scrollToTop, isActive}) => {
    const subCategories = category.sub_categories
    const fontActive = isActive.index == index ? true : false

    return (
        <>
            <div onClick={() => toggleCategories(index)} className={`font ${fontActive && 'active'}`}>
                {category.category} { subCategories.length ? (<FontAwesomeIcon  className="icon"  icon={fontActive ? faAngleUp : faAngleDown} />) : null }
            </div>
            <div className={`child-category ${fontActive && 'active'}`}>
                <ul>
                    {
                        subCategories.map((subCategory, index) => (<>
                            <li key={index} ><NavLink onClick={() => scrollToTop()} to="/">{subCategory.sub_category}</NavLink></li>
                        </>))
                    }
                </ul>
            </div>
        </>
    )
}
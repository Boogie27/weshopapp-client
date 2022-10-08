import React, {useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faXmark,
    faAngleUp,
    faAngleDown,
} from '@fortawesome/free-solid-svg-icons'




const Categories = ({categoryToggleBtn, scrollToTop}) => {
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
                            <li className="cat-main"><CategoriesChild index={0} scrollToTop={scrollToTop} isActive={isActive} toggleCategories={toggleCategories}/></li>
                            <li className="cat-main"><CategoriesChild index={1} scrollToTop={scrollToTop} isActive={isActive} toggleCategories={toggleCategories}/></li>
                            <li className="cat-main"><CategoriesChild index={2} scrollToTop={scrollToTop} isActive={isActive} toggleCategories={toggleCategories}/></li>
                            <li className="cat-main"><CategoriesChild index={3} scrollToTop={scrollToTop} isActive={isActive} toggleCategories={toggleCategories}/></li>
                            <li className="cat-main"><CategoriesChild index={4} scrollToTop={scrollToTop} isActive={isActive} toggleCategories={toggleCategories}/></li>
                            <li className="cat-main"><CategoriesChild index={5} scrollToTop={scrollToTop} isActive={isActive} toggleCategories={toggleCategories}/></li>
                            <li className="cat-main"><CategoriesChild index={6} scrollToTop={scrollToTop} isActive={isActive} toggleCategories={toggleCategories}/></li>
                            <li className="cat-main"><CategoriesChild index={7} scrollToTop={scrollToTop} isActive={isActive} toggleCategories={toggleCategories}/></li>
                            <li className="cat-main"><CategoriesChild index={8} scrollToTop={scrollToTop} isActive={isActive} toggleCategories={toggleCategories}/></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}





export default Categories














const CategoriesChild = ({index, toggleCategories, scrollToTop, isActive}) => {
    const fontActive = isActive.index == index ? true : false

    return (
        <>
            <div onClick={() => toggleCategories(index)} className={`font ${fontActive && 'active'}`}>
                Games <FontAwesomeIcon  className="icon"  icon={fontActive ? faAngleUp : faAngleDown} />
            </div>
            <div className={`child-category ${fontActive && 'active'}`}>
                <ul>
                    <li><NavLink onClick={() => scrollToTop()} to="/">XBox</NavLink></li>
                    <li><NavLink onClick={() => scrollToTop()} to="/">Playstation</NavLink></li>
                    <li><NavLink onClick={() => scrollToTop()} to="/">XBox Controllers</NavLink></li>
                    <li><NavLink onClick={() => scrollToTop()} to="/">Playstation Controllers</NavLink></li>
                </ul>
            </div>
        </>
    )
}
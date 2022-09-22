import React from 'react'
import { logo } from '../../Data'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faBars,
    faToggleOn,
    faToggleOff,
    faArrowLeftLong,
} from '@fortawesome/free-solid-svg-icons'



const SideNavigation = ({ appState, setSideNavi, sideNavi, sideNavToggle, toggleAppState }) => {
    return (
        <div className={`side-nav-container ${sideNavi && 'active'}`}>
           <div onClick={sideNavToggle} className="dark-skin"></div>
           <div className={`side-navi ${appState && 'active'}`}>
                <SideNavHeader sideNavToggle={sideNavToggle}/>
                <div className="side-nav-body">
                    <CategoryLinks sideNavToggle={sideNavToggle} appState={appState} toggleAppState={toggleAppState} />
                    <ImportantLinks sideNavToggle={sideNavToggle}/>
                </div>
           </div>
        </div>
    )
}

export default SideNavigation








const SideNavHeader = ({sideNavToggle}) => {
    return (
        <div className="nav-title-header">
            <div className="img"><img src={logo('logo.png')} alt="logo"/></div>
            <div className="side-nav-icon">
                <FontAwesomeIcon onClick={sideNavToggle} className="icon" icon={faArrowLeftLong} />
            </div>
        </div>
    )
}






const CategoryLinks = ({appState, sideNavToggle, toggleAppState}) => {
    const toggleIcon = appState ? faToggleOn : faToggleOff

    return (
        <div className="side-nav-items">
            <div className="title-header"><h4>SHOP BY CATEGORIES</h4></div>
            <ul>
                <li><NavLink onClick={() => sideNavToggle(false) } to="/">Home</NavLink></li>
                <li><NavLink onClick={() => sideNavToggle(false) } to="/product">Product</NavLink></li>
                <li><NavLink onClick={() => sideNavToggle(false) } to="/cart">Cart</NavLink></li>
                <li><NavLink onClick={() => sideNavToggle(false) } to="/wishlist">Wishlist</NavLink></li>
                <li><NavLink onClick={() => sideNavToggle(false) } to="/register">Register</NavLink></li>
                <li><NavLink onClick={() => sideNavToggle(false) } to="/login">Login</NavLink></li>
                <li className="app-theme-btn"><span>App Theme</span><FontAwesomeIcon onClick={toggleAppState}className="icon"  icon={toggleIcon} /></li>
            </ul>
        </div>
    )
}







const ImportantLinks = ({sideNavToggle}) => {
    return (
        <div className="side-nav-items">
            <div className="title-header"><h4>IMPORTANT LINKS</h4></div>
            <ul>
                <li><NavLink onClick={() => sideNavToggle(false) } to="/">Home</NavLink></li>
                <li><NavLink onClick={() => sideNavToggle(false) } to="/wishlist">Wishlist</NavLink></li>
                <li><NavLink onClick={() => sideNavToggle(false) } to="/special">Special</NavLink></li>
                <li><NavLink onClick={() => sideNavToggle(false) } to="/register">Register</NavLink></li>
                <li><NavLink onClick={() => sideNavToggle(false) } to="/login">Login</NavLink></li>
            </ul>
        </div>
    )
}
import React from 'react'
import { logo } from '../../Data'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faBars,
    faXmark,
    faToggleOn,
    faToggleOff,
} from '@fortawesome/free-solid-svg-icons'



const SideNavigation = ({ appState, setSideNavi, sideNavi, sideNavToggle, toggleAppState }) => {
    return (
        <div className={`side-nav-container ${sideNavi && 'active'}`}>
           <div onClick={sideNavToggle} className="dark-skin"></div>
           <div className={`side-navi ${appState && 'active'}`}>
                <SideNavHeader sideNavToggle={sideNavToggle}/>
                <div className="side-nav-body">
                    <CategoryLinks setSideNavi={setSideNavi} appState={appState} toggleAppState={toggleAppState} />
                    <ImportantLinks setSideNavi={setSideNavi}/>
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
                <FontAwesomeIcon onClick={sideNavToggle} className="icon" icon={faXmark} />
            </div>
        </div>
    )
}






const CategoryLinks = ({appState, setSideNavi, toggleAppState}) => {
    const toggleIcon = appState ? faToggleOn : faToggleOff

    return (
        <div className="side-nav-items">
            <div className="title-header"><h4>SHOP BY CATEGORIES</h4></div>
            <ul>
                <li><NavLink onClick={() => setSideNavi(false) } to="/">Home</NavLink></li>
                <li><NavLink onClick={() => setSideNavi(false) } to="/product">Product</NavLink></li>
                <li><NavLink onClick={() => setSideNavi(false) } to="/cart">Cart</NavLink></li>
                <li><NavLink onClick={() => setSideNavi(false) } to="/wishlist">Wishlist</NavLink></li>
                <li><NavLink onClick={() => setSideNavi(false) } to="/register">Register</NavLink></li>
                <li><NavLink onClick={() => setSideNavi(false) } to="/login">Login</NavLink></li>
                <li className="app-theme-btn"><span>App Theme</span><FontAwesomeIcon onClick={toggleAppState}className="icon"  icon={toggleIcon} /></li>
            </ul>
        </div>
    )
}







const ImportantLinks = ({setSideNavi}) => {
    return (
        <div className="side-nav-items">
            <div className="title-header"><h4>IMPORTANT LINKS</h4></div>
            <ul>
                <li><NavLink onClick={() => setSideNavi(false) } to="/">Home</NavLink></li>
                <li><NavLink onClick={() => setSideNavi(false) } to="/wishlist">Wishlist</NavLink></li>
                <li><NavLink onClick={() => setSideNavi(false) } to="/special">Special</NavLink></li>
                <li><NavLink onClick={() => setSideNavi(false) } to="/register">Register</NavLink></li>
                <li><NavLink onClick={() => setSideNavi(false) } to="/login">Login</NavLink></li>
            </ul>
        </div>
    )
}
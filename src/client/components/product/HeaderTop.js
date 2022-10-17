import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faList,
  faAngleDown,
  faGripVertical,
} from '@fortawesome/free-solid-svg-icons'


const HeaderTop = ({view, getLimit, getAlphabet, sortProduct, productViewToggle, categoryToggleBtn}) => {
    return (
        <div className="product-top-bar">
            <div className="topbar-left">
                <FontAwesomeIcon onClick={() => productViewToggle('grid')} className={`icon ${view == 'grid' ? 'active' : ''}`}  icon={faGripVertical} />
                <FontAwesomeIcon onClick={() => productViewToggle('list')} className={`icon ${view == 'list' ? 'active' : ''}`}  icon={faList} />
                <span onClick={() => categoryToggleBtn()}>
                    Categories
                    <FontAwesomeIcon  className="icon"  icon={faAngleDown} />
                </span>
            </div>
            <div className="topbar-right">
                <ul>
                    <li>
                        <span>Sort By:</span> 
                        <select onChange={getAlphabet} className="name">
                            <option value="-">Default</option>
                            <option value={'ascending'}>Name (A - Z)</option>
                            <option value={'desc'}>Name (Z - A)</option>
                        </select>
                    </li>
                    <li>
                        <span>Show:</span> 
                        <select  onChange={getLimit} className="number">
                            <option value="-">Select</option>
                            <option value="5">5</option>
                            <option value="20">20</option>
                            <option value="40">40</option>
                            <option value="60">60</option>
                            <option value="80">80</option>
                            <option value="100">100</option>
                        </select>
                    </li>
                </ul>
            </div>
        </div>
    )
}






export default HeaderTop
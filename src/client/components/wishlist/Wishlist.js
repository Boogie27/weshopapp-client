import React, { useState, useEffect  } from 'react'
import { NavLink, useSearchParams, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faXmark,
    faTrashCan,
    faCartShopping,
    faArrowRightLong,
} from '@fortawesome/free-solid-svg-icons'
import Axios from 'axios'
import Cookies from 'js-cookie'
import { 
    url, 
    money,
    token,
    product_img, 
} from '../../Data'
import Preloader from '../preloader/Preloader'
import { AddWishlistModalDropDown, WishlistModalDropDown } from '../dropdown/WishlistModalDropDown'









const Wishlist = ({wishlist, setWishlist}) => {
    const [title, setTitle] = useState('')
    const [button, setButton] = useState({style: '', title: ''})
    const [isAdding, setIsAdding] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isAddModalOpen, setIsAddModalOpen] = useState(false)
    const [productID, setProductID] = useState(null)
    const [isLoading, setIsLoading ] = useState({loading: true, text: 'Fetching Wishlist, Please Wait...'})
    

    useEffect(() => {
        preloaderToggle(true, 'Fetching Wishlist, Please Wait...', 2000)
        fetchWishlistItems()
    }, [])



   

    // add item to cart
    const addProductToCart = (product_id) => {
        setTitle('Do you wish to add this item to Cart?')
        setIsAddModalOpen(true)
        setProductID(product_id)
    }


    // fetcg=h wishlist items
    const fetchWishlistItems = () => {
        if(token()){
            Axios.get(url(`/api/fetch-wishlist-items/${token()}`)).then((response) => {
                if(response.data){
                    return setWishlist(response.data)
                }
            })
        }
        setWishlist([])
    }

    // set and remove preloader
    const preloaderToggle = (state, text, time) => {
        setIsLoading({loading: state, text: text})
        setTimeout(() => {
            setIsLoading({loading: false, text: ''})
        }, time)
    }


    // wishlist delete all and add all button
    const wishlistItemsToggle = (item) => {
        if(item.string == 'delete-all'){
            setIsAddModalOpen(false)
            setIsModalOpen(item.action) 
            setButton({style: '', title: 'Delete'})
            setTitle('Do you wish to delete all items?')
        }else if(item.string == 'add-all'){
            setIsModalOpen(false)
            setIsAddModalOpen(true)
            setButton({style: 'add', title: 'Add to cart'})
            setTitle('Do you wish to add all items to Cart?')
        }
        setProductID(item.string)
    }


    const modalToggle = (action, string) => { 
        setIsDeleting(false)
        setIsModalOpen(action) 
        setProductID(string)
        setIsAddModalOpen(false)
        setButton({style: '', title: 'Remove'})
        setTitle("Remove this item from Wishlist?")
    }


    // delete item fromwishlist
    const deleteItem = () => {
        console.log(productID)
    }


    // add item fromwishlist
    const addItemToCart = () => {
        console.log(productID)
    }
    

    return (
        <div className="wishlist-container">
            {
                isLoading.loading ? (
                <>
                    <EmptyWishlist/>
                    <Preloader text={isLoading.text}/>
                </>
                ) : (
                    <>
                    {
                        wishlist.length == 0 ? (<EmptyWishlist/>) : (
                            <>
                                <WishlistItems wishlist={wishlist} wishlistItemsToggle={wishlistItemsToggle} addProductToCart={addProductToCart} modalToggle={modalToggle}/>
                                <MobileWishList/>
                            </>
                        )
                    }
                    </>
                )
            }
            {
                isModalOpen ? <WishlistModalDropDown button={button} title={title} modalToggle={modalToggle} isDeleting={isDeleting} deleteItem={deleteItem}/>
                : '' 
            }
            {
                isAddModalOpen ? <AddWishlistModalDropDown button={button} title={title} modalToggle={modalToggle} isAdding={isAdding} addItemToCart={addItemToCart}/>
                : '' 
            }
        </div>
    )
}











export default Wishlist







const WishlistItems = ({wishlist, wishlistItemsToggle, addProductToCart, modalToggle}) => {
    return (
        <div className="desktop wishlist-items">
            <div className="title-header"><h3>Wishlist Items</h3></div>
            <table className="table">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col"></th>
                <th scope="col">PRODUCT NAME</th>
                <th scope="col">PRICE</th>
                <th scope="col">STOCK STATUS</th>
                <th scope="col">ACTION</th>
                </tr>
            </thead>
            <tbody>
                {
                    wishlist.map((item, index) => <Items key={index} item={item} addProductToCart={addProductToCart} modalToggle={modalToggle}/> )
                }
                  
            </tbody>
            </table>
            <WishListTotal totalPrice={1000} wishlistItemsToggle={wishlistItemsToggle}/>
        </div>
    )
}







const Items = ({modalToggle, item, addProductToCart}) => {
    const isActive = item.product.quantity > 0 ? 'active' : ''
    const isAvailable = item.product.quantity > 0 ? 'Available' : 'Out of stock'

    return (
        <tr>
            <th scope="row">
                <div className="content">
                    <FontAwesomeIcon onClick={() => modalToggle(true, item.product._id)} className="cart-transh-can"  icon={faTrashCan} />
                </div>
            </th>
            <td>
                <NavLink to={`/detail?product=${item.product._id}&category=${item.product.category}`}>
                    <img src={product_img(item.product.image[0])} alt=""/>
                </NavLink>
            </td>
            <td>
                <div className="content">
                    <NavLink to={`/detail?product=${item.product._id}&category=${item.product.category}`}>
                        {item.product.product_name}
                    </NavLink>
                </div>
            </td>
            <td><div className="content">{money(item.product.price)}</div></td>
            <td>
                <div className="content">
                    <span className={isActive}>{isAvailable}</span>
                </div>
            </td>
            <td>
                <div className="content">
                {
                    isActive == 'active' ? (
                        <button onClick={() => addProductToCart(item.product._id)}>
                            <FontAwesomeIcon className="icon"  icon={faCartShopping} />
                            ADD TO CART
                        </button>
                    ) : null
                }
                    <div className="added"><b>Added on:</b> 20 march 2022</div>
                </div>
            </td>
        </tr>
    )
}





const WishListTotal = ({totalPrice, wishlistItemsToggle}) => {
    return (
        <div className="wishlist-total">
            <ul>
                <li><b className="">Total: <span className="btn-orange">{money(totalPrice)}</span></b></li>
                <li className="wt-icon">
                    <FontAwesomeIcon onClick={() => wishlistItemsToggle({action: true, string: 'delete-all'})} className="icon trash"  icon={faTrashCan} />
                    <FontAwesomeIcon onClick={() => wishlistItemsToggle({action: true, string: 'add-all'})} className="icon cart"  icon={faCartShopping} />
                </li>
            </ul>
        </div>
    )
}





const EmptyWishlist = () => {
    return (
        <div className="empty-wishlist-container">
            <div className="title-header"><h3>EMPTY WISHLIST</h3></div>
            <NavLink to="/" className="empty-wishlist-button">
                Continue shopping
                <FontAwesomeIcon className="icon"  icon={faArrowRightLong} />
            </NavLink>
        </div>
    )
}





const MobileWishList = () => {
    return (
        <div className="mobile-wishlist-container">
            <div className="mw-dark-theme"></div>
            <div className="mw-body">
                <div className="title-header">
                    <h3>Wishlist</h3>
                    <p>Items (2)</p>
                </div>
                <div className="mw-body-frame">
                    <MobileWishlistItem />
                    <MobileWishlistItem />
                    <MobileWishlistItem />
                </div>
                <div className="mw-buttom">
                    <div className="mw-buttom-left"><b>Total: <span>{money(1000)}</span></b></div>
                    <div className="mw-buttom-right">
                        <FontAwesomeIcon className="icon"  icon={faCartShopping} />
                        <FontAwesomeIcon className="icon"  icon={faTrashCan} />
                    </div>
                </div>
            </div>
        </div>
    )
}






const MobileWishlistItem = () => {
    return (
        <div className="mw-item-body">
            <div className="mw-image">
                <NavLink to={`/detail?product=${''}&category=${''}`}>
                    <img src={product_img('1.jpg')} alt=""/>
                </NavLink>
            </div>
            <ul className="ul-mw-content">
                <li className="mw-content-name">
                    <NavLink to={`/detail?product=${''}&category=${''}`}>
                        Iphone
                    </NavLink>
                </li>
                <li><b>Price:</b> {money(1000)}</li>
                <li><b>Availability:</b> <span className="availability active">out of stock</span></li>
                <li><b>Added on: </b><span className="added-on">20 march 2022</span></li>
                <li>
                    <div className="action-button">
                        <FontAwesomeIcon className="icon"  icon={faCartShopping} />
                        <FontAwesomeIcon className="icon"  icon={faTrashCan} />
                    </div>
                </li>
            </ul>
        </div>
    )
}








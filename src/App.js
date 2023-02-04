import React, { useState, useEffect, Fragment , useRef} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './client/components/css/Style.css'
import { Route, Routes } from 'react-router-dom'
import Home from './client/components/home/Home'
import Footer from './client/components/footer/Footer'
import Detail from './client/components/detail/Detail'
import Login from './client/components/auth/Login'
import ResetPassword from './client/components/auth/ResetPassword'
import Checkout from './client/components/checkout/Checkout'
import PaySuccess from './client/components/checkout/PaySuccess'
import Verification from './client/components/auth/Verification'


import Cart from './client/components/cart/cart'
import Wishlist from './client/components/wishlist/Wishlist'
import Product from './client/components/product/Product'
import Categories from './client/components/product/Categories'
import FloatNavigation from './client/components/navigation/FloatNavigation'

import Register from './client/components/auth/Register'
import Navigation from './client/components/navigation/Navigation'
import MiniNavigation from './client/components/navigation/MiniNavigation'
import Axios from 'axios'
import Cookies from 'js-cookie'
import {  url } from './client/Data'
import QuickView from './client/components/quickview/QuickView'
import AlertDanger from './client/components/alerts/AlertDanger'
import AlertSuccess from './client/components/alerts/AlertSuccess'
import Preloader from './client/components/preloader/Preloader'
import LogoutDropDown from './client/components/dropdown/LogoutDropDown'
import { ToastContainer, toast } from 'react-toastify';
import FloatShoppingCart from './client/components/cart/FloatShoppingCart'





function App() {
  const temporary = useRef()
  const [user, setUser] = useState(false)
  let token = Cookies.get('weshopappuser')
  let state = Cookies.get('weshopappstate')
  const [cart, setCart] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [shipping, setShipping] = useState(0)

  const [isQuickView, setIsQuickView] = useState(false)
  const [categories, setCategories] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [message, setMessage] = useState(false)
  const [errorAlert, setErrorAlert] = useState(false)
  const [logoutModal, setLogoutModal] = useState(false)
  const [appState, setAppState] = useState(false)
  const [sideNavi, setSideNavi] = useState(false)
  const [floatNav, setFloatNav] = useState(false)
  const [categoryToggle, setCategoryToggle] = useState(false)
  const [mobileSearch, setMobileSearch] = useState(false)
  const [floatCartState, setFloatCartState] = useState(false)
  const [isLoading, setIsLoading ] = useState({state: false, text: ''})
  

  const toggleSearch = () => {
      setMobileSearch(!mobileSearch)
  }


  const toggleAppState = () => {
    const theme = appState ? false : true
    // if(user && token){
    //   // change user theme here
    //   Axios.post(url('/api/user-theme-change'), {_id: user._id, theme: theme}).then((response) => {
    //     Cookies.set('weshopappstate', response.data, { expires: 7 })
    //     return setAppState(response.data)
    //   })
    // }
    
    const myTheme = theme ? 'dark' : 'light'
    Cookies.set('weshopappstate', myTheme, { expires: 7 })
    return setAppState(theme)
  }


  const sideNavToggle = () => {
      // window.scrollTo(0, 0)
      setSideNavi(!sideNavi)
  }




  // Add item to wishlist
  // const addItemToWishList = () => {
  //   console.log('yess')
  // }


  // scroll window even
  const windowsScrollEvent = () => {
    const handleScroll = event => {
      let pageScroll = window.scrollY
      if(pageScroll >= 100){
        setFloatNav(true)
      }else{
        setFloatNav(false)
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }



  // fetch product categories
  const fetchCategories = () => {
    Axios.get(url('/api/categories')).then((response) => {
      return setCategories(response.data)
    })
  }

  


  // change user app theme on page load
  const userAppState = (user) => {
    if(state){
      if(state === 'light'){
        return setAppState(false)
      }else if(state === 'dark'){
        return setAppState(true)
      }
    }
    if(token && user){
      if(user && user.theme === 'light'){
        return setAppState(false)
      }else  if(user && user.theme === 'dark')
      if(user && user.theme === 'dark'){
        return setAppState(true)
      }
    }
    setAppState(false)
  }
  

  const getLoggedinUser = () => {
    if(token) {
      setIsLoading({state: true, text: 'Fetching data, Please wait...'})
      Axios.post(url('/api/get-auth-user'), { token: token }).then((response) => {
        const authUser = response.data
        if(authUser){
          setUser(authUser)
          fetchCartItems()
          setIsLoading({state: false, text: ''})
          return userAppState(authUser)
        }
      })
    }
    setIsLoading({state: false, text: ''})
    return setAppState(false)
  }

  

  //logout user
  const logoutUser = (e) => {
    e.preventDefault()
    if(token){

      // setIsLoading({state: false, text: 'Processing Logout...'})
      Axios.get(url(`/api/logout/token=${token}`)).then((response) => {
        const data = response.data
        if(data === true){
          setTimeout(() => {
            alertMessage("You have been loggedout successfully!", 5000) //set logout success alertMessage
          }, 2000)
        }
        setUser(false)
        setCart([])
        setWishlist([])
        preloaderToggle(true, 'Logging out user, Please wait...', 2000)
      })
    }
    Cookies.set('weshopappuser', '', { expires: new Date(0) })
  }


  const alertMessage = (string, time) => {
      setMessage(string)
      setTimeout(() => {
        setMessage('')
      }, time)
  }



   // set and remove preloader
   const preloaderToggle = (state, text, time) => {
      setIsLoading({state: state, text: text})
      setTimeout(() => {
        setIsLoading({state: false, text: ''})
      }, time)
    }


  const alertError = (string, time) => {
    setErrorAlert(string)
    setTimeout(() => {
      setErrorAlert('')
    }, time)
  }
  


  // open or close modal
  const modalToggle = (action = false, string = null) => {
    setLogoutModal(action)
    setSideNavi(false)
  }


  //logout user
  const logoutUserModal = (e) => {
    setLogoutModal(false)
    logoutUser(e)
  }



  // fetch cart items
  const fetchCartItems  = (string = null) => {
    if(string && token === undefined){
      token = string
    }
    if(token){
      Axios.get(url(`/api/get-cart-items/${token}`)).then((response) => { 
          if(response.data){
            shippingFee()
            fetchTotal(response.data)
            return setCart(response.data)
          }
          setCart([])
      })
    }
    shippingFee(false)
  }


  // toggle cart quantity
  const quantityToggle = (index, counter,) => {
    const item = cart[index]
    let new_quantity = counter + item.quantity
    Axios.post(url('/api/toggle-cart-quantity'), {id: item._id, new_quantity: new_quantity, product_id: item.product._id}).then((response) => {
        if(response.data === 'greater'){
            return notify_error('Quantity exceed available quantity!')
        }
        if(response.data){
            return fetchCartItems()
        }
        return notify_error("Something went wront, try again!")
    })
}
 


  // fetch shopping cart total
  const fetchTotal = (data) => {
    let total = 0
    if(data.length){
      data.map((item, index) => {
      return total = total + ( item.price * item.quantity)
    })
    return setTotalPrice(total)
    }
    return setTotalPrice(0)
  }



  // fetch shipping fee
  const shippingFee = (value) => {
    if(cart.length > 0){
      return setShipping(5)
    }
    return setShipping(0)
}

 
  
  // add item to cart
  const addToCart = (item) => {
    Axios.post(url('/api/check-for-user-token'), {token: token}).then((response) => {
      const data = response.data
      if(data.tokenExists === false){
          closeQuickView(false)
          if(item.old_url){
            Cookies.set('current_url', item.old_url, { expires: 1 })
          }
         return alertError('Login or Regsiter to add this item to Cart!', 4000)
      }

      if(data.tokenExists === true){
        item.user_id = user._id

        Axios.post(url('/api/add-to-cart'), item).then((response) => {
          if(!response.data.data){
            closeQuickView(false)
            return notify_error('Something went wront,try again!')
          }

          fetchCartItems()
          closeQuickView(false)
          notify_success('Item added to cart successfully!')
          // setCart(response.data.cart)
        })
      }
    })
  }




  const fetchWishlistItems = (string = null) => {
    if(string && token === undefined){
      token = string
    }
    if(token !== undefined){
      Axios.get(url(`/api/fetch-wishlist-items/${token}`)).then((response) => {
        if(response.data){
          return setWishlist(response.data)
        }
      })
    }
    setWishlist([])
  }


  // add to wish list
  const addToWishlist = (item) => {
    Axios.post(url('/api/check-for-user-token'), {token: token}).then((response) => {
      const data = response.data
      if(data.tokenExists === false){
          closeQuickView(false)
          if(item.old_url){
            Cookies.set('current_url', item.old_url, { expires: 1 })
          }
         return alertError('Login or Regsiter to add this item to Wishlist!', 4000)
      }

      if(data.tokenExists === true){
        Axios.post(url(`/api/add-to-wishlist`), item).then((response) => {
          if(response.data.state === 'exists'){
            closeQuickView(false)
            return alertError('Product already exists in wishlist', 3000)
          }
          if(response.data.state === 'created'){
            fetchWishlistItems()
            closeQuickView(false)
            alertMessage('Product added to wishlist successfully!', 3000)
            return true
          }
          if(response.data.state === 'error'){
            closeQuickView(false)
            return alertError('Something went wrong, Try again!', 3000)
          }
        })
      }
    })
  }


  // show quick view
  const showQuickView = (product) => {
    setIsQuickView(product)
  }

  // close Quick view
  const closeQuickView = () => {
    setIsQuickView(null)
  }



  // open and close float cart
  const floatCartStateToggle = (state) => {
    // window.scrollTo(0, 0)
    setFloatCartState(state)
  }


  // scroll page to top
  const scrollToTop = () => {
    setSideNavi(false)
    window.scrollTo(0, 0)
    setCategoryToggle(false)
  }



  // open and close product categroy
  const categoryToggleBtn = () => {
      setSideNavi(false)
      setCategoryToggle(!categoryToggle)
  }


  // delete cart item
  const deleteCartItem = (id) => {
      Axios.post(url('/api/delete-cart-item'), {_id: id}).then((response) => {
        if(response.data){
          return fetchCartItems()
        }
        return notify_error("Something went wront, try again!")
    })
  }


  // delete item from wishlist
  const deleteWishlistItem = (id) => {
    if(id === 'delete-all'){
      setWishlist([])
    }
    if(id !== 'delete-all'){
      setWishlist(wishlist.filter((item) => item._id !== id)) // filter product from wishlist
    }
    Axios.post(url(`/api/delete-wishlist-item`), {_id: id, user: user}).then((response) => {
      if(response.data){
        return true;
      }
    })
  }
  


  const notify_success = (string) => {
    toast.success(string, {
      position: "bottom-right",
      autoClose: 5000,
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      hideProgressBar: false,
      });
}


const notify_error = (string) => {
    toast.error(string, {
      position: "bottom-right",
      autoClose: 5000,
      draggable: true,
      closeOnClick: true,
      pauseOnHover: true,
      progress: undefined,
      hideProgressBar: false,
      });
}




// styling
// const styles = {
//   floatNav: {
//     opacity: 1,
//     visibility: 'visible',
//   }
// }

temporary.current = getLoggedinUser
temporary.current = userAppState
temporary.current = fetchCartItems
temporary.current = fetchWishlistItems
temporary.current = fetchCategories
temporary.current = windowsScrollEvent


useEffect(() => {
  temporary.current()
}, [])



  return (
    <div className={`parent-container ${appState && 'active'}`}>
      <div className="parent-nav-container">
        <Navigation  user={user} modalToggle={modalToggle} cart={cart} appState={appState} setSideNavi={setSideNavi} 
          sideNavToggle={sideNavToggle} toggleSearch={toggleSearch} mobileSearch={mobileSearch} 
          sideNavi={sideNavi} toggleAppState={toggleAppState} floatCartStateToggle={floatCartStateToggle}
          categoryToggleBtn={categoryToggleBtn}
        />
        <MiniNavigation user={user} wishlist={wishlist} modalToggle={modalToggle}/>
        {message && <AlertSuccess alert={message}/>}
        {errorAlert && <AlertDanger alert={errorAlert}/>}
        <FloatNavigation
          user={user} modalToggle={modalToggle} cart={cart} appState={appState} setSideNavi={setSideNavi} 
          sideNavToggle={sideNavToggle} toggleSearch={toggleSearch} mobileSearch={mobileSearch} 
          sideNavi={sideNavi} toggleAppState={toggleAppState} floatCartStateToggle={floatCartStateToggle}
          categoryToggleBtn={categoryToggleBtn} message={message} errorAlert={errorAlert} floatNav={floatNav}
        />
      </div>
      { isLoading.state ? (
        <div className="expand-page">
            <Preloader text={isLoading.text}/>
        </div>
      ) : (
        <Routes>
          <Route path="/" element={<Home user={user} showQuickView={showQuickView} closeQuickView={closeQuickView} scrollToTop={scrollToTop} addToWishlist={addToWishlist} appState={appState} addToCart={addToCart}/>}/>
          <Route path="/detail" element={<Detail scrollToTop={scrollToTop} showQuickView={showQuickView} addToWishlist={addToWishlist} user={user} addToCart={addToCart} alertError={alertError} alertMessage={alertMessage}/>}/>
          <Route path="/cart" element={<Cart user={user} cart={cart} totalPrice={totalPrice} quantityToggle={quantityToggle} preloaderToggle={preloaderToggle} fetchCartItems={fetchCartItems} deleteCartItem={deleteCartItem} addToWishlist={addToWishlist} setCart={setCart} addToCart={addToCart} notify_success={notify_success} notify_error={notify_error}/>}/>
          <Route path="/wishlist" element={<Wishlist wishlist={wishlist} deleteWishlistItem={deleteWishlistItem} setWishlist={setWishlist}/>}/>
          <Route path="/login" element={<Login preloaderToggle={preloaderToggle} fetchWishlistItems={fetchWishlistItems} alertMessage={alertMessage} fetchCartItems={fetchCartItems} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
          <Route path="/register" element={<Register alertMessage={alertMessage} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
          <Route path="/products" element={<Product user={user} showQuickView={showQuickView} addToWishlist={addToWishlist} addToCart={addToCart} scrollToTop={scrollToTop} categoryToggleBtn={categoryToggleBtn}/>}/>
          <Route path="/reset-password" element={<ResetPassword fetchWishlistItems={fetchWishlistItems} alertMessage={alertMessage} fetchCartItems={fetchCartItems} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
          <Route path="/checkout" element={<Checkout cart={cart} shippingFee={shippingFee} shipping={shipping} totalPrice={totalPrice} quantityToggle={quantityToggle} notify_success={notify_success} notify_error={notify_error} fetchCartItems={fetchCartItems}/>} />
          <Route path="/verification" element={<Verification/>} />
          <Route path="/payment-success" element={<PaySuccess/>} />
        </Routes>
      )
      }
      
      <Footer/>
      {logoutModal && <LogoutDropDown modalToggle={modalToggle} logoutUserModal={logoutUserModal} username={user.user_name}/>}
      { categoryToggle && <Categories categories={categories} scrollToTop={scrollToTop} categoryToggleBtn={categoryToggleBtn}/> }
      <FloatShoppingCart cart={cart} floatCartState={floatCartState} floatCartStateToggle={floatCartStateToggle}/>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} 
        newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover
      />
      <Fragment>
      {
          isQuickView ? (<QuickView  user={user} addToCart={addToCart} addToWishlist={addToWishlist} alertError={alertError} product={isQuickView} closeQuickView={closeQuickView} />) : null
      }
      </Fragment>
    </div>
  );
}

export default App;







// https://capricathemes.com/opencart/OPC09/OPC090216/OPC1/index.php?route=common/home

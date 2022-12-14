import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './client/components/css/Style.css'
import { Route, Routes } from 'react-router-dom'
import Home from './client/components/home/Home'
import Footer from './client/components/footer/Footer'
import Detail from './client/components/detail/Detail'
import Login from './client/components/auth/Login'
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
import {  url, name } from './client/Data'
import AlertDanger from './client/components/alerts/AlertDanger'
import AlertSuccess from './client/components/alerts/AlertSuccess'
import Preloader from './client/components/preloader/Preloader'
import LogoutDropDown from './client/components/dropdown/LogoutDropDown'
import { ToastContainer, toast } from 'react-toastify';
import FloatShoppingCart from './client/components/cart/FloatShoppingCart'





function App() {
  const [user, setUser] = useState(false)
  let token = Cookies.get('weshopappuser')
  let state = Cookies.get('weshopappstate')
  const [cart, setCart] = useState([])
  const [categories, setCategories] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [message, setMessage] = useState(false)
  const [errorAlert, setErrorAlert] = useState(false)
  const [logoutModal, setLogoutModal] = useState(false)
  const [appState, setAppState] = useState(false)
  const [sideNavi, setSideNavi] = useState(false)
  const [floatNav, setFloatNav] = useState(false)
  const [categoryToggle, setCategoryToggle] = useState(false)
  const [isLoggedin, setIsLoggedin ] = useState(false)
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


   
  useEffect(() => {
    getLoggedinUser() //get auth user
    userAppState(user)
    fetchCartItems()
    fetchWishlistItems()
    fetchCategories()
    windowsScrollEvent()

  }, [])




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
      if(state == 'light'){
        return setAppState(false)
      }else if(state == 'dark'){
        return setAppState(true)
      }
    }
    if(token && user){
      if(user && user.theme == 'light'){
        return setAppState(false)
      }else  if(user && user.theme == 'dark')
      if(user && user.theme == 'dark'){
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
    if(user && token){
      setIsLoading({state: false, text: 'Processing Logout...'})
      Axios.get(url(`/api/logout?id=${user._id}`)).then((response) => {
        if(response.data){
          alertMessage("Logout successfully!", 5000) //set logout success alertMessage
          Cookies.set('weshopappuser', '', { expires: new Date(0) })
        }else{
          Cookies.set('weshopappuser', '', { expires: new Date(0) })
        }
        setUser(false)
        fetchCartItems()
        fetchWishlistItems()
        preloaderToggle(true, 'Logging out user, Please wait...', 2000)
      })
    }
  }


  const alertMessage = (string, time) => {
      setMessage(string)
      const timer = setTimeout(() => {
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
    const timer = setTimeout(() => {
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
    if(string && token == undefined){
      token = string
    }
    
    if(token){
      Axios.get(url(`/api/get-cart-items/${token}`)).then((response) => { 
          if(response.data){
            return setCart(response.data)
          }
          setCart([])
      })
    }
  }
 

  const addToCart = (item) => {
    if(!user){
      if(item.old_url){
        Cookies.set('current_url', item.old_url, { expires: 1 })
      }
      return notify_error('Login or Register to proceed!')
    }

    item.user_id = user._id

    Axios.post(url('/api/add-to-cart'), item).then((response) => {
      if(!response.data.data){
        return notify_error('Something went wront,try again!')
      }

      fetchCartItems()
      notify_success('Item added to cart successfully!')
      // setCart(response.data.cart)
    })
  }




  const fetchWishlistItems = (string = null) => {
    if(string && token == undefined){
      token = string
    }
    if(token != undefined){
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
    if(!user){
      if(item.old_url){
        Cookies.set('current_url', item.old_url, { expires: 1 })
      }
      return notify_error('Login or Register to proceed!')
    }

    Axios.post(url(`/api/add-to-wishlist`), item).then((response) => {
      if(response.data.state == 'exists'){
        return alertError('Product already exists in wishlist', 3000)
      }
      if(response.data.state == 'created'){
        fetchWishlistItems()
        alertMessage('Product added to wishlist successfully!', 3000)
        return true
      }
      if(response.data.state == 'error'){
        return alertError('Something went wrong, Try again!', 3000)
      }
    })
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
    if(id == 'delete-all'){
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
      <Routes>
          <Route path="/" element={<Home user={user} scrollToTop={scrollToTop} addToWishlist={addToWishlist} appState={appState} addToCart={addToCart}/>}/>
          <Route path="/detail" element={<Detail scrollToTop={scrollToTop} addToWishlist={addToWishlist} user={user} addToCart={addToCart} alertError={alertError} alertMessage={alertMessage}/>}/>
          <Route path="/cart" element={<Cart user={user} cart={cart} deleteCartItem={deleteCartItem} addToWishlist={addToWishlist} setCart={setCart} addToCart={addToCart} notify_success={notify_success} notify_error={notify_error}/>}/>
          <Route path="/wishlist" element={<Wishlist wishlist={wishlist} deleteWishlistItem={deleteWishlistItem} setWishlist={setWishlist}/>}/>
          <Route path="/login" element={<Login fetchWishlistItems={fetchWishlistItems} alertMessage={alertMessage} fetchCartItems={fetchCartItems} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
          <Route path="/register" element={<Register alertMessage={alertMessage} setUser={setUser} isLoading={isLoading} setIsLoading={setIsLoading}/>}/>
          <Route path="/products" element={<Product scrollToTop={scrollToTop} categoryToggleBtn={categoryToggleBtn}/>}/>
      </Routes>
      <Footer/>
      { isLoading.state && <Preloader text={isLoading.text}/> }
      {logoutModal && <LogoutDropDown modalToggle={modalToggle} logoutUserModal={logoutUserModal} username={user.user_name}/>}
      { categoryToggle && <Categories categories={categories} scrollToTop={scrollToTop} categoryToggleBtn={categoryToggleBtn}/> }
      <FloatShoppingCart cart={cart} floatCartState={floatCartState} floatCartStateToggle={floatCartStateToggle}/>
      <ToastContainer position="bottom-right" autoClose={5000} hideProgressBar={false} 
        newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover
      />
    </div>
  );
}

export default App;







// https://capricathemes.com/opencart/OPC09/OPC090216/OPC1/index.php?route=common/home

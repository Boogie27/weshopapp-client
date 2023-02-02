import React, { useState, useEffect, Fragment } from 'react'
// import { NavLink } from 'react-router-dom'
import RightSide from './RightSide'
import LeftSide from './LeftSide'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {  url } from '../../Data'
import Preloader from '../preloader/Preloader'
import Axios from 'axios'
import { CartModalDropDown } from '../dropdown/CartModalDropDown'




const Checkout = ({cart, totalPrice, shipping, shippingFee, quantityToggle, fetchCartItems,  notify_success, notify_error}) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [deleteItemID, setDeleteItemID] = useState(null)
    const [isLoading, setIsLoading ] = useState({state: true, text: 'Fetching Order, Please Wait...'}) 

    


     // open and close delete modal 
     const CartModalToggle = (action, string) => { 
        setIsDeleting(false)
        setIsModalOpen(action) 
        setDeleteItemID(string)
    }


    // delete cart item
    const deleteItem = () => {
        if(cart.length == 1){
            preloaderToggle(true, 'Deleting Product, Please Wait...', 1000)
        }

        if(!deleteItemID){
            return notify_error("Something went wront, try again!")
        }
        Axios.post(url('/api/delete-cart-item'), {_id: deleteItemID}).then((response) => {
            if(response.data){
                fetchCartItems()
                CartModalToggle(false, null)
                setDeleteItemID(null)
                return notify_success("Cart item deleted successfuly!")
            }
            return notify_error("Something went wront, try again!")
        })
    }


     // set and remove preloader
   const preloaderToggle = (state, text, time) => {
    setIsLoading({state: state, text: text})
    setTimeout(() => {
      setIsLoading({state: false, text: ''})
    }, time)
  }
    

    useEffect(() => {
        shippingFee(shipping)
        preloaderToggle(true, 'Fetching Order, Please Wait...', 2000)
    }, [shipping])

    return (
        <Fragment>
            {
                isLoading.state ? (
                    <div className="expand-page">
                        <Preloader text={isLoading.text}/>
                    </div>
                ) : (
                <div className="checkout-container">
                    <Row className="show-grid">
                        <Col xs={12} sm={12} md={6} lg={8} xl={8}><LeftSide /></Col>
                        <Col xs={12} sm={12} md={6} lg={4} xl={4}><RightSide cart={cart} shipping={shipping} totalPrice={totalPrice} quantityToggle={quantityToggle} CartModalToggle={CartModalToggle}/></Col>
                    </Row>
                    <div className="">
                        {
                            isModalOpen && <CartModalDropDown isDeleting={isDeleting} deleteItem={deleteItem} CartModalToggle={CartModalToggle} />
                        }
                     </div>
                </div>
                )
            }
        </Fragment>
    )
}


export default Checkout




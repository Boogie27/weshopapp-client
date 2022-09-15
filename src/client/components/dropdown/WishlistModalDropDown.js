import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faXmark,
    faTrashCan,
    faCartShopping,
} from '@fortawesome/free-solid-svg-icons'






const WishlistModalDropDown = ({title, isDeleting, modalToggle, deleteItem, button}) => {
    
    return (
        <div className="modal-dropdown">
            <div className="dark-skin">
                <div className="modal-dropdown-body">
                    <div className="modal-close"><FontAwesomeIcon onClick={() => modalToggle(false, null)} className="icon"  icon={faXmark} /></div>
                    <div className="body-modal">
                        <h4>{title}</h4>
                        <button className={button.style} onClick={() => deleteItem()}>
                            <FontAwesomeIcon className="icon"  icon={button.style == 'add' ? faCartShopping : faTrashCan} /> 
                            {
                                isDeleting ? 'Please wait...' : `${button.title}`
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}









const AddWishlistModalDropDown = ({title, isAdding, modalToggle, addItemToCart}) => {
    
    return (
        <div className="modal-dropdown">
            <div className="dark-skin">
                <div className="modal-dropdown-body">
                    <div className="modal-close"><FontAwesomeIcon onClick={() => modalToggle(false, null)} className="icon"  icon={faXmark} /></div>
                    <div className="body-modal">
                        <h4>{title}</h4>
                        <button className='add' onClick={() => addItemToCart()}>
                            <FontAwesomeIcon className="icon"  icon={faCartShopping} /> 
                            {
                                isAdding ? 'Please wait...' : `Add to cart`
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export
{ 
    WishlistModalDropDown,
    AddWishlistModalDropDown
}

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faXmark,
    faTrashCan,
} from '@fortawesome/free-solid-svg-icons'






const CartModalDropDown = ({isDeleting, CartModalToggle, deleteItem}) => {
    return (
        <div className="modal-dropdown">
            <div className="dark-skin">
                <div className="modal-dropdown-body">
                    <div className="modal-close"><FontAwesomeIcon onClick={() => CartModalToggle(false, null)} className="icon"  icon={faXmark} /></div>
                    <div className="body-modal">
                        <h4>Do you wish to delete this item?</h4>
                        <button onClick={() => deleteItem()}>
                            <FontAwesomeIcon className="icon"  icon={faTrashCan} /> 
                            {
                                isDeleting ? 'Please wait...' : 'Delete'
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}


export { 
    CartModalDropDown
}
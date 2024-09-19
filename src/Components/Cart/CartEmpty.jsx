import { BsFillCartXFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import './Cart.css'

const CartEmpty = () => {
    return (
        <>
            <div className="emptyCart-container">
                <div className="emptyCart-icon">
                    <BsFillCartXFill />
                </div>
                <div className="emptyCart-text">
                    Your Cart is Empty
                </div>
                <div className="startShopBtn"><NavLink className='startShopLink' to='/all-products'>Start Shopping</NavLink></div>
            </div>
        </>
    )
}

export default CartEmpty

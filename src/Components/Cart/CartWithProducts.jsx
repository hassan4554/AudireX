import { useSelector, useDispatch } from 'react-redux'
import { incrementCartItem, decrementCartItem, removeCartItem } from '../Redux/CartItems/cartItemSlice'
import { MdDeleteForever } from "react-icons/md";
import { useState, useEffect } from 'react';
import './cart.css'

const CartWithProducts = () => {
    const cartItems = useSelector((state) => state.cartItems.value);
    const [totalPrice, setTotalPrice] = useState(0);
    const [originalPrice, setOriginalPrice] = useState(0);
    const [discount, setDiscount] = useState(0);
    const dispatch = useDispatch();

    const incrementQuantity = (item) => {
        dispatch(incrementCartItem(item))
    }

    const decrementQuantity = (item) => {
        dispatch(decrementCartItem(item));
    }

    const handleRemoveItem = (item) => {
        dispatch(removeCartItem(item));
    }

    useEffect(() => {
        const total = cartItems.reduce((prev, item) => prev + (item.finalPrice * item.quantity), 0);
        const original = cartItems.reduce((prev, item) => prev + (item.originalPrice * item.quantity), 0);
        const disc = original - total;
        setTotalPrice(total);
        setOriginalPrice(original);
        setDiscount(disc);

    }, [cartItems])



    return (
        <>
            <div className="cartItems-container">
                <div className="cartItems-listing">

                    {
                        cartItems.map((item) => {
                            return (
                                <div key={item.id} >
                                    <div className="cartItem">
                                        <figure className="item-figure">
                                            <img src={item.images[0]} alt="" className="item-img" />
                                        </figure>
                                        <div className="cartItem-details">
                                            <p className="item-title">{item.title}</p>
                                            <p className="item-info">{item.info}</p>

                                            <div className="item-prices">
                                                <div className="price-final">Rs. {item.finalPrice.toLocaleString('en-IN')}</div>
                                                <div className="price-original line-through">Rs. {item.originalPrice.toLocaleString('en-IN')}</div>
                                            </div>

                                            <div className="item-quantity">
                                                <button className="decrementBtn"
                                                    onClick={() => { decrementQuantity(item); }}
                                                >-</button>
                                                <p className="quantity-text">{item.quantity}</p>
                                                <button className="incremnetBtn"
                                                    onClick={() => { incrementQuantity(item); }}
                                                >+</button>
                                            </div>
                                        </div>
                                        <button className="removeBtn"
                                            onClick={() => { handleRemoveItem(item) }}
                                        ><MdDeleteForever /></button>
                                    </div>
                                    <div className="gap"></div>
                                    <div className="seperator"></div>
                                    <div className="gap"></div>
                                </div>
                            )
                        })
                    }

                </div>
                <div className="orderSummary-container">
                    <div className="order-heading">Order Summary
                        {
                            cartItems.length == 1 ? ` (1 Item)` : `(${cartItems.length} Items)`
                        }
                    </div>
                    <div className="gap"></div>
                    <div className="orderSummary">
                        <div className="order-pricing">
                            <div>
                                <div className="price-tag">Original Price</div>
                                <div className="price-og">Rs. {originalPrice.toLocaleString('en-IN')}</div>
                            </div>
                            <div>
                                <div className="price-tag">Discount</div>
                                <div className="discount">Rs. {discount.toLocaleString('en-IN')}</div>
                            </div>
                            <div>
                                <div className="price-tag">Delivery</div>
                                <div className="delivery">Free</div>
                            </div>
                        </div>

                        <div className="gap"></div>
                        <div className="seperator"></div>
                        <div className="gap"></div>

                        <div className="total-price-div">
                            <div className="total">Total Price</div>
                            <div className="total-price">Rs. {totalPrice.toLocaleString('en-IN')}</div>
                        </div>
                        <div className="gap"></div>
                        <button className="checkoutBtn">Checkout</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CartWithProducts

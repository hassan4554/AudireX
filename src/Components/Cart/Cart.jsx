import './cart.css'
import { useSelector } from 'react-redux'
import CartEmpty from './CartEmpty';
import CartWithProducts from './CartWithProducts';
import { useDocTitle } from '../Utilities/DocumentTitle'
import { ScrollToTop } from "../Utilities/ScrollToTop.jsx"

const Cart = () => {
    useDocTitle('Cart - AudireX')
    ScrollToTop();
    const cartItemsLength = useSelector((state) => state.cartItems.value.length);
    return (
        <>
            {
                cartItemsLength <= 0 ? <CartEmpty /> : <CartWithProducts />
            }
        </>
    )
}

export default Cart

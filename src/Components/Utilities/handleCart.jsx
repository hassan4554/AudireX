
import { useDispatch } from 'react-redux'
import { incrementCartItem } from '../Redux/CartItems/cartItemSlice'

const HandleCartBtn = ({ item }) => {
    const dispatch = useDispatch();

    const handleCartAdd = async (e, item) => {
        e.target.style.backgroundColor = '#008000';
        e.target.innerText = 'Added';
        e.target.disabled = true;
        dispatch(incrementCartItem(item));
        await delay();
        e.target.style.backgroundColor = '#ff0000';
        e.target.innerText = 'Add to cart';
        e.target.disabled = false;
    }

    const delay = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, 1500);
        });
    }

    return (
        <button className='cardBtn' onClick={(e) => handleCartAdd(e, item)}>Add to Cart</button>
    );
}

export default HandleCartBtn
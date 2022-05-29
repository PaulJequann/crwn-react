import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, decreaseItemQuantity, removeItemFromCart } from '../../store/cart/cart.action';
import { selectCartItems } from '../../store/cart/cart.selector';
import './checkout-item.styles.scss';

const CheckoutItem = ({ cartItem }) => {
    const dispatch = useDispatch();

    const cartItems = useSelector(selectCartItems);
    const { name, imageUrl, quantity, price } = cartItem;

    const increaseQuantity = () => dispatch(addItemToCart(cartItems, cartItem));
    const decreaseQuantity = () => dispatch(decreaseItemQuantity(cartItems, cartItem));
    const removeItem = () => dispatch(removeItemFromCart(cartItems, cartItem));

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={decreaseQuantity}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={increaseQuantity}>&#10095;</div>
            </span>
            <span className='price'>{price}</span>
            <div className='remove-button'>
                <span onClick={removeItem}>&#10005;</span>
            </div>
        </div>
    )
}

export default CheckoutItem

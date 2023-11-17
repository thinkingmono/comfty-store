import { useSelector } from "react-redux"
import CartItem from "./CartItem"

const CartItemsList = () => {
    //useSelector Hook to access store's cart and destructure cartItems property.
    const { cartItems } = useSelector((store) => store.cart);

    return (
        <div>
            {/*Map through cartItems to render each product in the cart*/}
            {cartItems.map((item) => {
                return <CartItem key={item.cartId} {...item} />
            })}
        </div>
    )
}

export default CartItemsList
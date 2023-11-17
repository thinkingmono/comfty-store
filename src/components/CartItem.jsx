import { useDispatch } from "react-redux"
import { editItem, removeItem } from "../features/cart/cartSlice"
import { formatPrice, generateAmountOptions } from "../utils"


const CartItem = ({ cartId, title, price, image, amount, company, productColor }) => {
    //Dispatch declaration to access store actions.
    const dispatch = useDispatch();

    //Remove item from the cart through dispatch calling to run removeItem item action from store's cart.
    const removeItemFromTheCart = () => {
        dispatch(removeItem({ cartId: cartId }));
    }

    //handle amount change through dispatch calling to run editItem action from store's cart.
    const handleAmount = (e) => {
        dispatch(editItem({ cartId: cartId, amount: parseInt(e.target.value) }))
    }

    return (
        <article className="mb-12 flex flex-col gap-y-4 sm:flex-row flex-wrap border-b border-base-300 pb-6 last:border-b-0">
            {/*Product Image*/}
            <img src={image} alt={title} className="h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover" />
            {/*Product Information*/}
            <div className="sm:ml-16 sm:w-48">
                <h3 className="capitalize font-medium">{title}</h3>
                <h4 className="mt-2 capitalize text-sm text-neutral-content">{company}</h4>
                <p className="mt-4 text-sm capitalize flex items-center gap-x-2">Color :<span className="badge badge-sm" style={{ backgroundColor: productColor }}></span></p>
            </div>
            {/*Cart Actions | Remove - Edit*/}
            <div className="sm:ml-12">
                <div className="form-control max-w-xs">
                    <label htmlFor="amount" className="label p-0"><span className="label-text">Amount</span></label>
                    <select name='amount' id='amount' className="mt-2 select select-base select-bordered select-xs" value={amount} onChange={handleAmount}>
                        {generateAmountOptions(amount + 5)}
                    </select>
                </div>
                <button type="button" className="mt-2 link link-primary link-hover text-sm" onClick={removeItemFromTheCart}>Remove</button>
            </div>
            {/*Format Product Price*/}
            <p className="font-medium sm:ml-auto">{formatPrice(price)}</p>
        </article>
    )
}

export default CartItem
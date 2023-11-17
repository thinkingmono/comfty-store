import { useSelector } from "react-redux"
import { CartItemsList, CartTotals, SectionTitle } from "../components"
import { Link } from "react-router-dom"

//Cart page
const Cart = () => {
  //Destructure user from store's user.
  const { user } = useSelector((store) => store.user);
  //Destructure num of items in the cart from store's cart.
  const { numItemsInCart } = useSelector((store) => store.cart);

  //Check if there are items in the cart. if don't render your cart is empty.
  if (numItemsInCart === 0) {
    return <SectionTitle text='Your cart is empty' />
  }

  return (
    <>
      {/*Title*/}
      <SectionTitle text='Shopping Cart' />
      <div className="mt-8 grid gap-8 lg:grid-cols-12">
        {/*Cart products*/}
        <div className="lg:col-span-8">
          <CartItemsList />
        </div>
        {/*Cart totals table*/}
        <div className="lg:col-span-4 lg:pl-4">
          <CartTotals />
          {/*Display login button or proceed to checkout if there is a user logged or not*/}
          {user ? <Link to='/checkout' className="btn btn-primary btn-block mt-8">Proceed to checkout</Link> : <Link to='/login' className="btn btn-primary btn-block mt-8">Please login</Link>}
        </div>
      </div>
    </>
  )
}

export default Cart
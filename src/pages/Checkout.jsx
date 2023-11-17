import { useSelector } from "react-redux"
import { SectionTitle, CheckoutForm, CartTotals } from '../components/'
import { redirect } from "react-router-dom";
import { toast } from "react-toastify";

//loader to get user info and check if it is logged.
export const loader = (store) => () => {
  //Capture user from store's user using getState.
  const user = store.getState().user.user;
  //Check if user is logged. If not throws a warning and redirect to login.
  if (!user) {
    toast.warn('You must be logged in to checkout');
    return redirect('/login');
  }
  return null
}

const Checkout = () => {
  //Destructure cart total from store's cart uding useSelector hook.
  const { cartTotal } = useSelector((store) => store.cart);
  //Check if there is a cart total. if not show your cart is empty.
  if (cartTotal === 0) return <SectionTitle text='Your cart is empty' />

  return (
    <>
      <SectionTitle text='Place your order' />
      <div className="mt-8 grid gap-8 md:grid-cols-2 items-start">
        <CheckoutForm />
        <CartTotals />
      </div>
    </>
  )
}

export default Checkout
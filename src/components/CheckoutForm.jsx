import { Form, redirect } from "react-router-dom"
import FormInput from "./FormInput"
import SubmitBtn from "./SubmitBtn"
import { authFetch, formatPrice } from "../utils";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";

export const action = (store, queryClient) => async ({ request }) => {
  const formData = await request.formData();
  const { name, address } = Object.fromEntries(formData);
  const user = store.getState().user.user;
  const { cartItems, orderTotal, numItemsInCart } = store.getState().cart;
  const info = { name, address, cartItems, orderTotal: formatPrice(orderTotal), numItemsInCart, chargeTotal: orderTotal };
  // console.log(info);
  try {
    const response = await authFetch.post('/orders', { data: info }, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    // Remove orders queries
    queryClient.removeQueries(['orders']);

    store.dispatch(clearCart());
    toast.success('Order Created');
    return redirect('/orders');
  } catch (error) {
    console.log(error);
    const errorMsg = error?.response?.data?.error?.message || 'There was an error';
    toast.error(errorMsg);
    if (error?.response?.status === 401 || 403) return redirect('/login');
    return null;
  }
}

const CheckoutForm = () => {
  return (
    <Form method="post" className="flex flex-col gap-y-4">
      <h4 className="font-medium text-xl capitalize">shipping information</h4>
      <FormInput label='First Name' name='name' type='text' defaultValue='' size='' />
      <FormInput label='Address' name='address' type='text' defaultValue='' size='' />
      <div className="mt-4">
        <SubmitBtn text='Place your order' />
      </div>
    </Form>
  )
}

export default CheckoutForm
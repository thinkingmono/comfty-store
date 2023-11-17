import { Form, redirect } from "react-router-dom"
import FormInput from "./FormInput"
import SubmitBtn from "./SubmitBtn"
import { authFetch, formatPrice } from "../utils";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/cartSlice";

//checkoutAction to handle router-dom Form action when submit. Gather order info and send via API.
export const action = (store, queryClient) => async ({ request }) => {
  //Takes form data from request.
  const formData = await request.formData();
  //Turn formData into an object and destructure name and address
  const { name, address } = Object.fromEntries(formData);
  //Capture user from store's user using getState() function.
  const user = store.getState().user.user;
  //Capture store's cart using getState() and destruture cartItems, orderTotal and numItemsInCart
  const { cartItems, orderTotal, numItemsInCart } = store.getState().cart;
  //Gather extractions into info object
  const info = { name, address, cartItems, orderTotal: formatPrice(orderTotal), numItemsInCart, chargeTotal: orderTotal };
  //Try catch block
  try {
    //Send a post request using authFetch axios custom intance to create an order. Pass info object as the order data and a bearer token as an authorization header. Token comes from store's user.
    const response = await authFetch.post('/orders', { data: info }, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });

    // Remove orders queries
    queryClient.removeQueries(['orders']);

    //Call dispatch to run clearCart action.
    store.dispatch(clearCart());
    //Succes toast notification
    toast.success('Order Created');
    return redirect('/orders');
  } catch (error) {
    //Error handling
    console.log(error);
    const errorMsg = error?.response?.data?.error?.message || 'There was an error';
    toast.error(errorMsg);
    //Handling unauthorize access if there is no user logged.
    if (error?.response?.status === 401 || 403) return redirect('/login');
    return null;
  }
}

const CheckoutForm = () => {
  return (
    //Router dom form build with FormInput and SubmitBtn custom components.
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
import { OrdersList, SectionTitle, ComplexPaginationContainer } from "../components"
import { toast } from "react-toastify";
import { authFetch } from "../utils";
import { redirect, useLoaderData } from "react-router-dom";

//React query function to fetch user's orders and relate key words to update query.
const userOrdersQuery = (queryParams, user) => {
  return ({
    queryKey: ['orders', user.username, queryParams.page ? parseInt(queryParams.page) : 1],
    //Send API get request to fetch the user's orders. Takes page from queryParams and pass bearer token from user.
    queryFn: () => authFetch.get('/orders', {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
  })
}

//ordersLoader to get orders and meta data from API.
export const loader = (store, queryClient) => async ({ request }) => {
  //get user from store's user.
  const user = store.getState().user.user;
  //Check if there is an user logged. If not show a warn.
  if (!user) {
    toast.warn('You must be logged in to view orders');
    return redirect('/login');
  }
  //get an object with url request search params (page)
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ])
  try {
    //call userOrdersQuery to fetch user's order and check if query was already done, to take it from cache or to execute it as a new one through query client.
    const response = await queryClient.ensureQueryData(userOrdersQuery(params, user));
    //destructure data and meta from fecthed response.data.
    const { data, meta } = response.data;
    //return data with the orders alias and meta.
    return { orders: data, meta };
  } catch (error) {
    //Error handling
    console.log(error);
    const errorMsg = error?.response?.data?.error?.message || 'There was an error accessing your orders';
    toast.error(errorMsg);
    //Check if a 401 or 403 authorization errors. Redirect to login if comes up.
    if (error?.response?.status === 401 || 403) return redirect('/login');
    return null;
  }
}

const Orders = () => {
  //capture meta from ordersLoader.
  const { meta } = useLoaderData();

  //Check if there are no orders. if not, render please make an order.
  if (meta.pagination.total < 1) return <SectionTitle text='Please make an order' />

  return (
    <>
      <SectionTitle text='Your Orders' />
      <OrdersList />
      <ComplexPaginationContainer />
    </>
  )
}

export default Orders
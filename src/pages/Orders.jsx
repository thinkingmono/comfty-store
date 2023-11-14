import { OrdersList, SectionTitle, PaginationContainer, ComplexPaginationContainer } from "../components"
import { toast } from "react-toastify";
import { authFetch } from "../utils";
import { redirect, useLoaderData } from "react-router-dom";

const userOrdersQuery = (queryParams, user) => {
  return ({
    queryKey: ['orders', user.username, queryParams.page ? parseInt(queryParams.page) : 1],
    queryFn: () => authFetch.get('/orders', {
      params: queryParams,
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
  })
}

export const loader = (store, queryClient) => async ({ request }) => {
  const user = store.getState().user.user;
  // console.log(user);
  if (!user) {
    toast.warn('You must be logged in to view orders');
    return redirect('/login');
  }
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ])
  try {
    const response = await queryClient.ensureQueryData(userOrdersQuery(params, user));
    const { data, meta } = response.data;
    return { orders: data, meta };
  } catch (error) {
    console.log(error);
    const errorMsg = error?.response?.data?.error?.message || 'There was an error accessing your orders';
    toast.error(errorMsg);
    if (error?.response?.status === 401 || 403) return redirect('/login');
    return null;
  }
}

const Orders = () => {
  const { meta } = useLoaderData();

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
import { Filters, PaginationContainer, ProductsContainer } from "../components"
import { authFetch } from "../utils"

//React query to fetch products based in the filters selection.
const productsQuery = (queryParams) => {
  //destructure filter search params from queryParams.
  const { search, category, company, sort, price, shipping, page } = queryParams;
  return ({
    //Keywords to query update.
    queryKey: ['products', search ?? '', category ?? 'all', company ?? 'all', sort ?? 'a-z', price ?? 100000, shipping ?? false, page ?? 1],
    //Send get request to fetch products based in search parameters using axios custom instance.
    queryFn: () => authFetch('/products', { params: queryParams })
  })

}

//productsLoader to return products and product's meta data.
export const loader = (queryClient) => async ({ request }) => {
  //Object params which stores search params from request url.
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ])
  //call productsQuery to fetch product's and check if query was already done, to take it from cache or to execute it as a new one through query client.
  const response = await queryClient.ensureQueryData(productsQuery(params));
  return { products: response.data.data, meta: response.data.meta, params };
}

const Products = () => {
  return (
    <>
      <Filters />
      <ProductsContainer />
      <PaginationContainer />
    </>
  )
}

export default Products
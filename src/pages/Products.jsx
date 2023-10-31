import { Filters, PaginationContainer, ProductsContainer } from "../components"
import { authFetch } from "../utils"

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ]);
  // console.log(params);
  const response = await authFetch('/products', { params });
  // console.log(response.data);
  // console.log(response.data.data);
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
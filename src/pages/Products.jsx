import { Filters, PaginationContainer, ProductsContainer } from "../components"
import { authFetch } from "../utils"

export const loader = async () => {
  const response = await authFetch('/products');
  // console.log(response.data);
  // console.log(response.data.data);
  return { products: response.data.data, meta: response.data.meta };
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
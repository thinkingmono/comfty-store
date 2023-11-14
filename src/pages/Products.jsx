import { QueryClient } from "@tanstack/react-query"
import { Filters, PaginationContainer, ProductsContainer } from "../components"
import { authFetch } from "../utils"

const productsQuery = (queryParams) => {
  const { search, category, company, sort, price, shipping, page } = queryParams;
  return ({
    queryKey: ['products', search ?? '', category ?? 'all', company ?? 'all', sort ?? 'a-z', price ?? 100000, shipping ?? false, page ?? 1],
    queryFn: () => authFetch('/products', {params: queryParams })
  })

}

export const loader = (queryClient) => async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries()
  ])
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
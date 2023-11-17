import { FeaturedProducts, Hero } from "../components/index"
import { authFetch } from "../utils"

//featured products api.
const featuredProductsUrl = '/products?featured=true';

//React query object to fetch featured products using axios custom instance authFetch.
const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => authFetch(featuredProductsUrl)
}

//landingLoader that returns featured products in landing component.
export const loader = (queryClient) => async () => {
  //Destructure data from featured products API. Check if query was already queried. if it was take it from cache, if not execute query.
  const { data } = await queryClient.ensureQueryData(featuredProductsQuery);
  //Capture featured products from data.data
  const products = data.data;
  return { products }
}

const Landing = () => {
  return (
    <>
      <Hero />
      <FeaturedProducts />
    </>
  )
}

export default Landing
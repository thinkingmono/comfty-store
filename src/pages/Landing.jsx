import { FeaturedProducts, Hero } from "../components/index"
import { authFetch } from "../utils"

const featuredProductsUrl = '/products?featured=true';

const featuredProductsQuery = {
  queryKey: ['featuredProducts'],
  queryFn: () => authFetch(featuredProductsUrl)
}

export const loader = (queryClient) => async () => {
  const { data } = await queryClient.ensureQueryData(featuredProductsQuery);
  const products = data.data;
  // console.log(products);
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
import { FeaturedProducts, Hero } from "../components/index"
import authFetch from "../utils"
import { useLoaderData } from 'react-router-dom'

const featuredProductsUrl = '/products?featured=true';

export const loader = async () => {
  try {
    const { data } = await authFetch(featuredProductsUrl);
    const products = data.data;
    // console.log(products);
    return {products};
  } catch (error) {
    console.log(error);
  }
}

const Landing = () => {
  // const {products} = useLoaderData();
  // console.log(products);

  return (
    <>
      <Hero />
      <FeaturedProducts/>
    </>
  )
}

export default Landing
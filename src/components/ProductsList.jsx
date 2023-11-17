import { Link, useLoaderData } from "react-router-dom"
import { formatPrice } from "../utils"

//Products list layout
const ProductsList = () => {
    //Destructure products from productsLoader.
    const { products } = useLoaderData();
    return (
        <div className="mt-12 grid gap-y-8">
            {/*Map through products*/}
            {products.map((product) => {
                //Destructure title, price and image from product attributes.
                const { title, price, image, company } = product.attributes;
                //Format product price in USD through function.
                const dollarsAmount = formatPrice(price)
                //Each product render
                return <Link key={product.id} to={`/products/${product.id}`} className="p-8 rounded-lg flex flex-col sm:flex-row gap-y-4 flex-wrap  bg-base-100 shadow-xl hover:shadow-2xl duration-300 group">
                    {/*Image*/}
                    <img src={image} alt={title} className='h-24 w-24 rounded-lg sm:h-32 sm:w-32 object-cover group-hover:scale-105 transition duration-300' />
                    {/*Product information*/}
                    <div className="ml-0 sm:ml-16">
                        <h3 className='capitalize font-medium text-lg'>{title}</h3>
                        <h4 className='capitalize text-md text-neutral-content'>{company}</h4>
                    </div>
                    <p className='font-medium ml-0 sm:ml-auto text-lg'>{dollarsAmount}</p>
                </Link>
            })}
        </div>
    )
}

export default ProductsList
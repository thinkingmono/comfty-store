import { Link, useLoaderData } from 'react-router-dom'
import { formatPrice } from '../utils';

//Products grid layout
const ProductsGrid = () => {
    //Destructure products from productsLoader.
    const { products } = useLoaderData();
    return (
        <div className='pt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
            {/*Map through products*/}
            {products.map((product) => {
                //Destructure title, price and image from product attributes.
                const { title, price, image } = product.attributes;
                //Format product price in USD through function.
                const dollarsAmount = formatPrice(price)
                return (
                    //Each product render
                    <Link to={`/products/${product.id}`} key={product.id} className='card w-full shadow-xl hover:shadow-2xl transition duration-300'>
                        {/*Image*/}
                        <figure className="px-4 pt-4">
                            <img src={image} alt={title} className='rounded-xl h-64 md-h-48 w-full object-cover' />
                        </figure>
                        {/*Product information*/}
                        <div className="card-body items-center text-center">
                            <h2 className='card-title capitalize tracking-wider'>{title}</h2>
                            <span className='text-secondary'>{dollarsAmount}</span>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}

export default ProductsGrid
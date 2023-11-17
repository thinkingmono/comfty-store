import { Link, useLoaderData } from "react-router-dom"
import { authFetch, formatPrice, generateAmountOptions } from "../utils"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { addItem } from "../features/cart/cartSlice"

//React query function to fetch product info based in the product's id.
const singleProductQuery = (id) => {
  return ({
    queryKey: ['product', id],
    queryFn: () => authFetch(`/products/${id}`)
  })
}

//singleProductLoader to return product info
export const loader = (queryClient) => async ({ params }) => {
  //destructure id from request params.
  const { id } = params;
  //call singleProductQuery to fetch product's info based on the id and check if query was already done, to take it from cache or to execute it as a new one through query client.
  const response = await queryClient.ensureQueryData(singleProductQuery(id));
  //save product info into product const.
  const product = response.data.data;
  return { product }
}

const SingleProduct = () => {
  //Take product from singleProductLoader
  const { product } = useLoaderData();
  //Destructure id from product from loader
  const { id } = product;
  //Destructure product info from data attributes.
  const { image, title, price, description, colors, company } = product.attributes;
  //format price in USD with formatPrice function.
  const dollarsAmount = formatPrice(price);
  //Product amount selector state variable
  const [amount, setAmount] = useState(1);
  //Product color radio button state variable
  const [productColor, setProductColor] = useState(colors[0]);
  //dispatch declaration.
  const dispatch = useDispatch();

  //gather product info to allow add to cart action.
  const cartProduct = {
    cartId: id + productColor,
    productId: id,
    image,
    title,
    price,
    amount,
    productColor,
    company
  }

  //handle product pdp amount selector change.
  const handleAmount = (e) => {
    //set amount value with amount selector value.
    setAmount(parseInt(e.target.value));
  }

  //handle onClick add to cart event. To add the current product properties and selection to the cart.
  const addToCart = () => {
    //call dispatch to run addItem action from store's cart passing cartProduct.
    dispatch(addItem({ product: cartProduct }));
  }

  return (
    <section>
      {/*Breadcrumbs*/}
      <div className="text-md breadcrumbs">
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/products'>Products</Link></li>
          <li>
            <Link to={`/products/${product.id}`} className="capitalize">{product.attributes.title}</Link>
          </li>
        </ul>
      </div>
      <div className="mt-6 grid gap-y-8 lg:grid-cols-2 lg:gap-x-16">
        {/*Product image*/}
        <img src={image} alt={title} className="w-96 h-96 object-cover rounded-lg lg:w-full" />
        {/*Product information*/}
        <div>
          {/*Product name*/}
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          {/*Product company*/}
          <h4 className="text-xl text-neutral-content font-bold mt-2">{company}</h4>
          {/*Product price*/}
          <p className="mt-3 text-xl">{dollarsAmount}</p>
          {/*Product description*/}
          <p className="mt-6 leading-8">{description}</p>
          <div className="mt-6">
            {/*Product colors*/}
            <h4 className="text-md font-medium tracking-wider capitalize">Colors</h4>
            <div className="mt-2">
              {colors.map((color) => {
                return <button type="button" key={color} className={`badge w-6 h-6 mr-2 ${color === productColor && 'border-2 border-secondary'}`} style={{ backgroundColor: color }} onClick={() => setProductColor(color)}></button>
              })}
            </div>
          </div>
          {/*Product amount - quantity*/}
          <div className="form-control w-full max-w-xs">
            <label className='label' htmlFor="amount">
              <h4 className="text-md font-medium tracking-wider capitalize">Amount</h4>
            </label>
            <select id="amount" className="select select-secondary select-bordered select-md" value={amount} onChange={handleAmount}>
              {generateAmountOptions(20)}
            </select>
          </div>
          {/*Add to cart button*/}
          <div className="mt-10">
            <button type="button" className="btn btn-secondary btn-md" onClick={addToCart}>Add to bag</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SingleProduct
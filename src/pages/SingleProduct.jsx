import { Link, useLoaderData } from "react-router-dom"
import { authFetch, formatPrice, generateAmountOptions } from "../utils"
import { useState } from "react"

export const loader = async ({ params }) => {
  const { id } = params;
  const response = await authFetch(`/products/${id}`);
  const product = response.data.data;
  // console.log(product);
  return { product }
}

const SingleProduct = () => {
  const { product } = useLoaderData();
  const { image, title, price, description, colors, company } = product.attributes;
  const dollarsAmount = formatPrice(price);
  const [amount, setAmount] = useState(colors[0]);
  const [productColor, setProductColor] = useState(1);
  // console.log(product);

  const handleAmount = (e) => {
    setAmount(parseInt(e.target.value));
  }

  return (
    <section>
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
        <img src={image} alt={title} className="w-96 h-96 object-cover rounded-lg lg:w-full" />
        <div>
          <h1 className="capitalize text-3xl font-bold">{title}</h1>
          <h4 className="text-xl text-neutral-content font-bold mt-2">{company}</h4>
          <p className="mt-3 text-xl">{dollarsAmount}</p>
          <p className="mt-6 leading-8">{description}</p>
          <div className="mt-6">
            <h4 className="text-md font-medium tracking-wider capitalize">Colors</h4>
            <div className="mt-2">
              {colors.map((color) => {
                return <button type="button" key={color} className={`badge w-6 h-6 mr-2 ${color === productColor && 'border-2 border-secondary' }`} style={{ backgroundColor: color }} onClick={() => setProductColor(color)}></button>
              })}
            </div>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className='label' htmlFor="amount">
              <h4 className="text-md font-medium tracking-wider capitalize">Amount</h4>
            </label>
            <select id="amount" className="select select-secondary select-bordered select-md" value={amount} onChange={handleAmount}>
              {generateAmountOptions(20)}
            </select>
          </div>
          <div className="mt-10">
            <button type="button" className="btn btn-secondary btn-md">Add to bag</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SingleProduct
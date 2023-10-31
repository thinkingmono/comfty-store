import { Form, Link, useLoaderData } from "react-router-dom"
import FormInput from "./FormInput"
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";

const Filters = () => {
  const { meta, params } = useLoaderData();
  const {search, category, company, order, price, shipping} = params;
  // console.log(meta);
  return (
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      <FormInput type='search' label='search product' name='search' defaultValue={search} size='input-sm' />
      <FormSelect label='Select Category' name='category' list={meta.categories} size='select-sm' defaultValue={category}/>
      <FormSelect label='Select Company' name='company' list={meta.companies} size='select-sm' defaultValue={company}/>
      <FormSelect label='Sort By' name='order' list={['a-z', 'z-a', 'high', 'low']} size='select-sm' defaultValue={order}/>
      <FormRange label='Select Price' name='price' size='range-sm' price={price}/>
      <FormCheckbox label='Free Shipping' name='shipping' size='checkbox-sm' defaultValue={shipping}/>
      <button type="submit" className="btn btn-primary btn-sm">Search</button>
      <Link to={'/products'} className="btn btn-accent btn-sm">Reset</Link>
    </Form>
  )
}

export default Filters
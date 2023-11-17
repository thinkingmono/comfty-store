import { Form, Link, useLoaderData } from "react-router-dom"
import FormInput from "./FormInput"
import FormSelect from "./FormSelect";
import FormRange from "./FormRange";
import FormCheckbox from "./FormCheckbox";

const Filters = () => {
  //Destructure meta data and params from productsLoader. 
  const { meta, params } = useLoaderData();
  //Destructure each param from params const to set default values into form fields.
  const { search, category, company, order, price, shipping } = params;
  return (
    //Router dom Form.
    <Form className="bg-base-200 rounded-md px-8 py-4 grid gap-x-4 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center">
      {/*Search field*/}
      <FormInput type='search' label='search product' name='search' defaultValue={search} size='input-sm' />
      {/*Category field selector. Passing categories from meta to build selector options*/}
      <FormSelect label='Select Category' name='category' list={meta.categories} size='select-sm' defaultValue={category} />
      {/*Company field selector. Passing companies from meta to build selector options*/}
      <FormSelect label='Select Company' name='company' list={meta.companies} size='select-sm' defaultValue={company} />
      {/*Sort order field selector with fixed values*/}
      <FormSelect label='Sort By' name='order' list={['a-z', 'z-a', 'high', 'low']} size='select-sm' defaultValue={order} />
      {/*Price range*/}
      <FormRange label='Select Price' name='price' size='range-sm' price={price} />
      {/*Free shipping checkbox*/}
      <FormCheckbox label='Free Shipping' name='shipping' size='checkbox-sm' defaultValue={shipping} />
      {/*Submit button to execute query*/}
      <button type="submit" className="btn btn-primary btn-sm">Search</button>
      {/*Reset link to clear filters to default*/}
      <Link to={'/products'} className="btn btn-accent btn-sm">Reset</Link>
    </Form>
  )
}

export default Filters
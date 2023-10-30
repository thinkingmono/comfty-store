import { useState } from "react"
import { useLoaderData } from "react-router-dom"
import { BsFillGridFill, BsList } from "react-icons/bs"
import ProductsList from "./ProductsList"
import ProductsGrid from "./ProductsGrid"

const ProductsContainer = () => {
  const { meta } = useLoaderData()
  const totalProducts = meta.pagination.total;
  // console.log(totalProducts);
  const [layoutState, setLayoutState] = useState('grid');

  const setActiveStyles = (layout) => {
    return `text-xl btn btn-circle btn-sm ${layout === layoutState ? 'btn-primary text-primary-content' : 'btn-ghost text-base-content'}`
  }

  return (
    <>
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        <h4 className="font-medium text-md">{totalProducts} product{totalProducts > 1 && 's'}</h4>
        <div className="flex gap-x-2">
          <button type="button" className={setActiveStyles('grid')} onClick={() => setLayoutState('grid')}><BsFillGridFill /></button>
          <button type="button" className={setActiveStyles('list')} onClick={() => setLayoutState('list')}><BsList /></button>
        </div>
      </div>
      <div>
        {totalProducts === 0 ? <h5 className="text-2xl mt-16">Sorry, no products match your search...</h5> : layoutState === 'grid' ? <ProductsGrid /> : <ProductsList />}
      </div>
    </>
  )
}

export default ProductsContainer
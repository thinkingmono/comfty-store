import { useState } from "react"
import { useLoaderData } from "react-router-dom"
import { BsFillGridFill, BsList } from "react-icons/bs"
import ProductsList from "./ProductsList"
import ProductsGrid from "./ProductsGrid"

const ProductsContainer = () => {
  //Destructure meta data from productsLoader
  const { meta } = useLoaderData()
  //Total products from meta pagination data.
  const totalProducts = meta.pagination.total;
  //Set state variable to store current producs layout grid or list. Default grid.
  const [layoutState, setLayoutState] = useState('grid');

  //Set styles to active layout icon.
  const setActiveStyles = (layout) => {
    return `text-xl btn btn-circle btn-sm ${layout === layoutState ? 'btn-primary text-primary-content' : 'btn-ghost text-base-content'}`
  }

  return (
    <>
      <div className="flex justify-between items-center mt-8 border-b border-base-300 pb-5">
        {/*Total products from query*/}
        <h4 className="font-medium text-md">{totalProducts} product{totalProducts > 1 && 's'}</h4>
        {/*Layout icons*/}
        <div className="flex gap-x-2">
          <button type="button" className={setActiveStyles('grid')} onClick={() => setLayoutState('grid')}><BsFillGridFill /></button>
          <button type="button" className={setActiveStyles('list')} onClick={() => setLayoutState('list')}><BsList /></button>
        </div>
      </div>
      {/*Products conditional rendering based in if there are products in query and which layout is active*/}
      <div>
        {totalProducts === 0 ? <h5 className="text-2xl mt-16">Sorry, no products match your search...</h5> : layoutState === 'grid' ? <ProductsGrid /> : <ProductsList />}
      </div>
    </>
  )
}

export default ProductsContainer
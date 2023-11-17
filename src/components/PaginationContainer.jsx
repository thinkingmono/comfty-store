import { useEffect } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom"

//Product page pagination container
const PaginationContainer = () => {
  //Destructure meta data from ordersLoader.
  const { meta } = useLoaderData();
  //Destructure page and page count from meta pagination info.
  const { page, pageCount } = meta.pagination;
  //Destructure search and pathname fro current location path.
  const { search, pathname } = useLocation();
  //navigate declaration
  const navigate = useNavigate();
  //Generate pages array from page count quantity.
  const pages = Array.from({ length: pageCount }, (_, index) => {
    const pageIndex = index + 1;
    return pageIndex
  })

  //Function to handle page change in onClick buttons event.
  const handlePageChange = (pageNumber) => {
    //Capture search params from url.
    const searchParams = new URLSearchParams(search);
    //Set page param with new page number.
    searchParams.set('page', pageNumber);
    //navigate to current path plus new page.
    navigate(`${pathname}?${searchParams.toString()}`);
  }

  //Check if products take more than two pages. If not, dont render page container.
  if (pageCount < 2) return null

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        {/*Prev Button*/}
        <button type="button" className="btn btn-xs sm:btn-md join-item" onClick={() => {
          let prevPage = page - 1;
          if (prevPage < 1) prevPage = pageCount;
          handlePageChange(prevPage)
        }}>PREV</button>
        {/*Pages Buttons*/}
        {pages.map((pageNumber) => {
          return <button type="button" key={pageNumber} className={`btn btn-xs sm:btn-md border-none join-item ${page === pageNumber ? 'bg-base-300 border-base-300' : ''}`} onClick={() => {
            handlePageChange(pageNumber);
          }}>{pageNumber}</button>
        })}
        {/*Next Button*/}
        <button type="button" className="btn btn-xs sm:btn-md join-item" onClick={() => {
          let nextPage = page + 1;
          if (nextPage > pageCount) nextPage = 1;
          handlePageChange(nextPage);
        }}>NEXT</button>
      </div>
    </div>
  )
}

export default PaginationContainer
import { useEffect } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom"

const PaginationContainer = () => {
  const { meta } = useLoaderData();
  // console.log(meta);
  const { page, pageCount } = meta.pagination;
  const { search, pathname } = useLocation();
  // console.log(location);
  const navigate = useNavigate();
  // console.log(navigate);
  const pages = Array.from({ length: pageCount }, (_, index) => {
    const pageIndex = index + 1;
    return pageIndex
  })
  // console.log(pages);

  const handlePageChange = (pageNumber) => {
    const searchParams = new URLSearchParams(search);
    // console.log(searchParams);
    searchParams.set('page', pageNumber);
    // console.log(searchParams);
    navigate(`${pathname}?${searchParams.toString()}`);
  }

  if (pageCount < 2) return null

  return (
    <div className="mt-16 flex justify-end">
      <div className="join">
        <button type="button" className="btn btn-xs sm:btn-md join-item" onClick={() => {
          let prevPage = page - 1;
          if (prevPage < 1) prevPage = pageCount;
          handlePageChange(prevPage)
        }}>PREV</button>
        {pages.map((pageNumber) => {
          return <button type="button" key={pageNumber} className={`btn btn-xs sm:btn-md border-none join-item ${page === pageNumber ? 'bg-base-300 border-base-300' : ''}`} onClick={() => {
            handlePageChange(pageNumber);
          }}>{pageNumber}</button>
        })}
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
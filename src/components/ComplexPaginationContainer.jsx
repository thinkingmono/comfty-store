import { useLoaderData, useLocation, useNavigate } from "react-router-dom"

const ComplexPaginationContainer = () => {
    const { meta } = useLoaderData();
    const { pageCount, page } = meta.pagination;
    const { search, pathname } = useLocation();
    const navigate = useNavigate();

    // console.log(pathname);

    const handlePageChange = (pageNumber) => {
        const searchParams = new URLSearchParams(search);
        // console.log(searchParams);
        searchParams.set('page', pageNumber);
        // console.log(searchParams);
        navigate(`${pathname}?${searchParams.toString()}`);
    }

    const addPageButton = ({ pageNumber, activeClass }) => {
        return <button type="button" key={pageNumber} className={`btn btn-xs sm:btn-md border-none join-item ${activeClass ? 'bg-base-300 border-base-300' : ''}`} onClick={() => {
            handlePageChange(pageNumber);
        }}>{pageNumber}</button>
    }

    const renderPageButtons = () => {
        const pageButtons = [];

        //first button
        pageButtons.push(addPageButton({ pageNumber: 1, activeClass: page === 1 }));

        //dots between first button and current page except if it is page 1 or 2 pages.
        if (page > 2) {
            pageButtons.push(<button className='join-item btn btn-xs sm:btn-md' key='dots-1'>...</button>);
        }

        //pages different than first and last
        if (page !== 1 && page !== pageCount) {
            pageButtons.push(addPageButton({ pageNumber: page, activeClass: true }));
        }

        //dots between current page and last page
        if (page < pageCount - 1) {
            pageButtons.push(<button className='join-item btn btn-xs sm:btn-md' key='dots-2'>...</button>)
        }

        //button for last page
        pageButtons.push(addPageButton({ pageNumber: pageCount, activeClass: page === pageCount }));

        return pageButtons;
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
                {renderPageButtons()}
                <button type="button" className="btn btn-xs sm:btn-md join-item" onClick={() => {
                    let nextPage = page + 1;
                    if (nextPage > pageCount) nextPage = 1;
                    handlePageChange(nextPage);
                }}>NEXT</button>
            </div>
        </div>
    )
}

export default ComplexPaginationContainer
import { useLoaderData, useLocation, useNavigate } from "react-router-dom"

//Pagination container to Orders page.
const ComplexPaginationContainer = () => {
    //Destructure orders meta data from ordersLoader.
    const { meta } = useLoaderData();
    //Destructure pageCount and page from meta data pagination.
    const { pageCount, page } = meta.pagination;
    //Destructure search and pathname from current url, using useLocation hook. Capture page param and current url.
    const { search, pathname } = useLocation();
    //Declare navigate object using useNavigate hook.
    const navigate = useNavigate();

    // console.log(pathname);

    //Function that handles page change when user clicks a pagination button.
    const handlePageChange = (pageNumber) => {
        //Capture url search params - page
        const searchParams = new URLSearchParams(search);
        //Set page param with the new page number.
        searchParams.set('page', pageNumber);
        //navigate to new url built with pathname plus new page param.
        navigate(`${pathname}?${searchParams.toString()}`);
    }

    //Function that creates a pagination button based on the page number need it and if it is active or not
    const addPageButton = ({ pageNumber, activeClass }) => {
        return <button type="button" key={pageNumber} className={`btn btn-xs sm:btn-md border-none join-item ${activeClass ? 'bg-base-300 border-base-300' : ''}`} onClick={() => {
            handlePageChange(pageNumber);
        }}>{pageNumber}</button>
    }

    //Function that populates page button array with corresponding page button.
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

    //Check if there is just one page of orders. if it is don't render pagination container.
    if (pageCount < 2) return null

    return (
        <div className="mt-16 flex justify-end">
            <div className="join">
                {/*PREV Button*/}
                <button type="button" className="btn btn-xs sm:btn-md join-item" onClick={() => {
                    let prevPage = page - 1;
                    if (prevPage < 1) prevPage = pageCount;
                    handlePageChange(prevPage)
                }}>PREV</button>
                {/*Buttons logic | dots or numbered pages*/}
                {renderPageButtons()}
                {/*NEXT Button*/}
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
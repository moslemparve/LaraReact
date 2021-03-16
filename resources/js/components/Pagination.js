import React from "react"
const Pagination = (props) => {
    const pageNumber = [];
    // console.log()
    for (let i = 1; i <= Math.ceil(props.totalPost / props.postPerpage); i++){
        pageNumber.push(i);
    }
    return (
        <div>
            <ul className="pagination" style={{ float: 'right'}}>
            <li className="page-item"><button disabled={props.currentPage == 1 ? ' disabled' :  '' } className="page-link" onClick={(e) => { e.preventDefault();props.paginate(props.currentPage-1)}}  href="#">Previous</button></li>
                {pageNumber.map((number) => {
                    return (
                        <li key={number} className={`page-item${ props.currentPage== number ? ' active' :  '' }`}>
                            <a href="#" onClick={(e) => { e.preventDefault();props.paginate(number)}} className="page-link">
                                {number}
                            </a>
                        </li>
                    );
                })}
                <li className="page-item"><button disabled={props.currentPage == pageNumber.length ? ' disabled' :  '' } className="page-link" onClick={(e) => {e.preventDefault();props.paginate(props.currentPage+1)
                     }} >Next</button></li>
            </ul>
            </div>
    )
}

export default Pagination

import React from "react";

import './styles.scss';

export const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={'pagination'}>
                {pageNumbers.map(number => (
                    <li onClick={e => paginate(e, number)} key={number} className={`page-item ${currentPage === number ? 'active' : ''}`}>
                        <a href='!#' className={'page-link'}>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}
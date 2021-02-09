import React from "react";
import { Pagination } from "../pagination";

import './styles.scss';

export const Footer = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
    return (
        <footer>
            <Pagination itemsPerPage={itemsPerPage}
                        totalItems={totalItems}
                        paginate={paginate}
                        currentPage={currentPage}/>
        </footer>
    )
}
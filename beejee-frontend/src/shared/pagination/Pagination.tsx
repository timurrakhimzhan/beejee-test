import React from "react"
import { PaginationWrapper } from "./styled-components"


type Props = {
    totalPages: number;
    onPageClick: (value: number) => void;
    currentPage: number;
}
const Pagination: React.FC<Props> = ({totalPages, currentPage, onPageClick}) => {
    return <PaginationWrapper>
        {Array(totalPages).fill(1).map((_, i) => (
            <span key={i + 1} onClick={() => onPageClick(i + 1)}
                  className={i + 1 === currentPage ? 'active pageItem' : 'pageItem'}>{i + 1}</span>
        ))}
    </PaginationWrapper>
}

export default Pagination;
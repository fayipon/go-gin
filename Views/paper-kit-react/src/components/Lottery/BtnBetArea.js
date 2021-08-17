import React from 'react';

// reactstrap components
import { Row, Col, Pagination, PaginationItem, PaginationLink } from "reactstrap";

export default function BtnBetArea(props) {

    function handleClick(e) {
        // 變更className
        if (e.target.className == "betarea_btn") {
            e.target.className = "betarea_btn active";
        } else {
            e.target.className = "betarea_btn";    
        }

        console.log(e.target.className);
        console.log(props);
    }

    return (
        <a className="betarea_btn" onClick={((e) => handleClick(e))}>
            {props.value}
        </a>
    );
}

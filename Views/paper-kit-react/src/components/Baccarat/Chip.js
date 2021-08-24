import React from "react";

function Chip(props) {

    var classN = "chip" + props.color;

    function handleClick(e) {

        // 將其他的設為非active
        var obj = document.querySelector('.chip1');
        obj.className = "chip1";

        obj = document.querySelector('.chip2');
        obj.className = "chip2";
  
        obj = document.querySelector('.chip3');
        obj.className = "chip3";

        obj = document.querySelector('.chip4');
        obj.className = "chip4";
  
        obj = document.querySelector('.chip5');
        obj.className = "chip5";

        // 變更className
        if (e.target.className == classN) {
            e.target.className = classN + " active";
        }
    }
    return (
        <div className={classN} onClick={((e) => handleClick(e))}>{props.value}</div>
    );
}

export default Chip;
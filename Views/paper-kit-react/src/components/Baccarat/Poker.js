import React from "react";

function Poker(props) {

    /*
    color 1 => 黑桃
    color 2 => 方塊
    color 3 => 梅花
    color 4 => 愛心

    card 1-13 , A-10 , J,Q,K

    */

    const pos_x = -12 - (props.card-1)*98 + "px";
    const pos_y = -5 - (props.color-1)*140 + "px";

    return (
        <div className="poker" style={{
            width:"100px",
            height:"140px",
            backgroundImage: "url(" + require("assets/img/poker/poker.jpg").default + ")",
            backgroundPosition: pos_x + " " + pos_y
        }} > </div>
    );
}


export default Poker;
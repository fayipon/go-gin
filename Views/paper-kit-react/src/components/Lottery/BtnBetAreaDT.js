import React from 'react';
import ReactDOM from 'react-dom';

export default function BtnBetArea(props) {

    function handleClick(e) {
        // 變更className
        if (e.target.className == "betareadt_btn") {
            e.target.className = "betareadt_btn active";
        } else {
            e.target.className = "betareadt_btn";    
        }

        // 計算注數
        var obj = document.querySelectorAll('.betareadt_btn');
        var bet_count = 0;
        obj.forEach(d => {
            if (d.className == "betareadt_btn active") {
                bet_count++;
            } 
        });
        
        ReactDOM.render(bet_count,document.getElementById('bet_count'))
        
        // 計算下注金額
        var amount = document.getElementById('amount').value;
        if (amount == "") {
            document.getElementById('amount').value = 1;
        }
        ReactDOM.render(amount*bet_count,document.getElementById('bet_amount'))
        
    }

    return (
        <a className="betareadt_btn" onClick={((e) => handleClick(e))}>
            {props.value}
        </a>
    );
}

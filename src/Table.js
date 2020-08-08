import React from "react";
import "./Table.css";
import Numeral from "numeral";

function Table({ countries }) {
    return <div className="table">
        {countries.map(({ country, cases }) => (
            <tr>
                <td>{country}</td>
                <td><strong>{Numeral(cases).format("0,000")}</strong></td>
            </tr>
        ))}
    </div>
}

export default Table;



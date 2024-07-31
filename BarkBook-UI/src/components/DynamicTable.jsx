import React from "react";
import { Link } from "react-router-dom";

export const DynamicTable = (props) => {
    const data = props.data;

    let columns = [];
    if (data.length > 0) {
        columns = Object.keys(data[0]);
    } else {
        console.log("DynamicTable.jsx found no data");
    }

    return (
        <div className={"container h-64 w-auto overflow-scroll overscroll-auto mx-auto"}>
            <div className={"flex flex-col"}>
                <table className="table-auto bg-green-200">
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index} className={"text-left"}>
                                    {column}
                                </th>
                            ))}
                            <th className="text-left">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex}>{item[column]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
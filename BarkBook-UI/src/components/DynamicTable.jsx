export const DynamicTable = (props) => {
    const data = props.data;

    let columns = [];
    if (data.length > 0) {
        columns = Object.keys(data[0]);
    } else {
        console.log("no data");
    }

    return (
        <div className={"container mx-auto bg-green-200"}>
            <div className={"flex flex-col"}>
                <table className="table-auto">
                    <thead>
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index} className={"text-left"}>
                                    {column}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((dog, index) => (
                            <tr key={index}>
                                {columns.map((column, colIndex) => (
                                    <td key={colIndex}>{dog[column]}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
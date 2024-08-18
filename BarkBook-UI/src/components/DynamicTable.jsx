import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteEventById } from "../service/EventService";
import { deleteDogById } from "../service/DogService";


export const DynamicTable = (props) => {

    const [loading, setLoading] = useState(true);
    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([])
    const [type, setType] = useState("");

    useEffect(() => {
        if (!props.data || props.data.length === 0) return;
        setData(props.data);
        setColumns(Object.keys(props.data[0]));
        setLoading(false);
    }, [props]);

    useEffect(() => {
        if (!props.type) return;
        setType(props.type);
    }, [props]);

    const deleteEntry = async (id) => {
        const confirmed = window.confirm(`Are you sure you want to delete this ${type}? This cannot be undone.`)
        if (confirmed) {
            if (type === "dog") {
                await deleteDogById(id);
            } else {
                await deleteEventById(id);
            }
            window.location.reload();
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const generateTable = () => {
        return (
            <>
                <table className="w-full text-sm text-left rtl:text-right text-amber-700">
                    <thead className="text-xs uppercase border-b border-amber-500 bg-amber-100">
                        <tr>
                            {columns.map((column, index) => (
                                <th key={index} className={"text-left px-6 py-3"}>
                                    {column}
                                </th>
                            ))}
                            {type ? (<>
                                <th className="text-left px-6 py-3">Actions</th>
                            </>) : (<></>)}
                        </tr>
                    </thead>
                    <tbody>
                    {data.map((item, index) => (
                        <tr key={index}
                            className="bg-amber-100 border-b border-amber-500">
                            {columns.map((column, colIndex) => (
                                <td key={colIndex} className="text-left px-6 py-4">
                                    {column.toLowerCase().includes('date') || column.toLowerCase().includes('time')
                                        ? formatDate(item[column])
                                        : item[column]}
                                </td>
                            ))}
                            {type ? (
                                <td className="flex flex-row p-2">
                                    <Link
                                        to={`/${type}/details/${item.id}`}
                                        className="bg-amber-500 hover:bg-amber-900 text-white p-1 mr-2 rounded"
                                    >
                                        View
                                    </Link>
                                    <Link
                                        to={`/${type}/edit/${item.id}`}
                                        className="bg-green-600 hover:bg-green-900 text-white p-1 mr-2 rounded"
                                    >
                                        Edit
                                    </Link>
                                    {/* <button
                                        className="bg-red-600 hover:bg-red-900 text-white p-1 mr-2 rounded"
                                        onClick={() => deleteEntry(item.id)}
                                    >
                                        Delete
                                    </button> */}
                                </td>
                            ) : (
                                <></>
                            )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </>
        )
    }

    if (loading) {
        return <>Loading...</>
    }

    return (
        <div className={"container h-64 w-auto no-scrollbar mx-auto overflow-auto"}>
            <div className={"relative overflow-x-auto shadow-md sm:rounded-lg"}>
                {data ? (<>{generateTable()}</>) : (<></>)}
            </div>
        </div>
    );
};

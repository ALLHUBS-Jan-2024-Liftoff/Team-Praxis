import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getAllEvents } from "../service/EventService";
import { getAllDogs } from "../service/DogService";
import axiosInstance from "../config/AxiosConfig.js";

export const DynamicTable = (props) => {
  const { data, type } = props;

  let columns = [];
  if (data.length > 0) {
    columns = Object.keys(data[0]);
  }

  const [dog, setDog] = useState([]);
  const [event, setEvent] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadDog();
    loadEvent();
  }, []);

  const loadDog = async () => {
    const result = await getAllDogs();
    setDog(result.data);
  };

  const loadEvent = async () => {
    const result = await getAllEvents();
    setEvent(result.data);
  };

  const deleteEntry = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this event? This cannot be undone.")
    if (confirmed) {
      // TODO: rework this
      await axiosInstance.delete(`http://localhost:8080/api/${type}/${id}`);
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

  return (
    <div className={"container h-64 w-auto overflow-scroll overscroll-auto mx-auto"}>
      <div className={"relative overflow-x-auto shadow-md sm:rounded-lg"}>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column, index) => (
                <th key={index} className={"text-left px-6 py-3"}>
                  {column}
                </th>
              ))}
              <th className="text-left px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
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
                      className="bg-blue-500 hover:bg-blue-800 text-white p-1 mr-2 rounded"
                    >
                      View
                    </Link>
                    <Link
                      to={`/${type}/edit/${item.id}`}
                      className="bg-green-500 hover:bg-green-800 text-white p-1 mr-2 rounded"
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-800 text-white p-1 mr-2 rounded"
                      onClick={() => deleteEntry(item.id)}
                    >
                      Delete
                    </button>
                  </td>
                ) : (
                  <></>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

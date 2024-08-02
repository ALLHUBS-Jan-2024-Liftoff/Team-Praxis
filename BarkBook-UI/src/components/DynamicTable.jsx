import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const DynamicTable = (props) => {
  const { data, type } = props;

  let columns = [];
  if (data.length > 0) {
    columns = Object.keys(data[0]);
  } else {
    console.log("DynamicTable.jsx found no data");
  }

  const [dog, setDog] = useState([]);
  const [event, setEvent] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadDog();
    loadEvent();
  }, []);

  const loadDog = async () => {
    const result = await axios.get("http://localhost:8080/api/dog");
    setDog(result.data);
  };

  const loadEvent = async () => {
    const result = await axios.get("http://localhost:8080/api/event");
    setEvent(result.data);
  };

  const deleteEntry = async (id) => {
    if (confirmDelete()) {
      console.log(type);
      console.log(id);
      const request = await axios.delete(
        `http://localhost:8080/api/${type}/${id}`
      );
      console.log(request);
      window.location.reload();
      if (type === dog) {
        loadDog();
      } else {
        loadEvent();
      }
    }
  };

  function confirmDelete() {
    return window.confirm("Are you sure you want to delete this dog?");
  }

  return (
    <div
      className={
        "container h-64 w-auto overflow-scroll overscroll-auto mx-auto"
      }
    >
      <div className={"flex flex-col"}>
        <table className="table-auto bg-green-200">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index} className={"text-left"}>
                  {column}
                </th>
              ))}
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {columns.map((column, colIndex) => (
                  <td key={colIndex}>{item[column]}</td>
                ))}
                {type ? (
                  <td className="flex flex-row p-2">
                    <Link
                      to={`/${type}/details/${item.id}`}
                      className="bg-blue-500 hover:bg-blue-700 text-white p-1 mr-2"
                    >
                      View
                    </Link>
                    <Link
                      to={`/${type}/edit/${item.id}`}
                      className="bg-green-500 hover:bg-green-700 text-white p-1 mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white p-1 mr-2"
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

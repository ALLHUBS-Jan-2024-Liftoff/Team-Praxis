import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditEvent = () => {

  let navigate = useNavigate();

  const { id } = useParams();

  const [event, setEvent] = useState({
    name:"",
    location:"",
    date:"",
    description:""
  });

  const { name, location, date, description } = event;

  const onInput = (e) => {
    setEvent({...event, [e.target.name]: e.target.value })
  };

  useEffect(() => {
    loadEvent();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
    await axios.put(`http://localhost:8080/api/event/${id}`, event)
    navigate("/user")
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const loadEvent = async () => {
    const result = await axios.get(`http://localhost:8080/api/event/${id}`)
    setEvent(result.data);
  }

  return (
    <form onSubmit={onSubmit}>
      <h1 className="text-base font-semibold leading-7 flex justify-center">
          Update Your Event's Details
        </h1>
        <div className="border-b border-gray-900/10 pb-12 flex justify-center">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Event Name
              </label>
              <div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={name}
                  onChange={onInput}
                  className="block rounded-md border-2"
                  placeholder="Enter text here..."
                >
                </input>
              </div>
            </div>

            <div className="sm:col-span-1">
              <label 
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Location 
              </label>
              <div>
                <input
                  id="location"
                  name="location"
                  type="text"
                  value={location}
                  onChange={onInput}
                  className="block rounded-md border-2"
                  placeholder="Enter text here..."
                >
                </input>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label 
                htmlFor="date"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Event Date & Time
              </label>
              <div>
                <input 
                  id="date"
                  name="date"
                  type="datetime-local" 
                  value={date}
                  onChange={onInput}
                  className="block rounded-md border-2"
                >
                </input>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
              htmlFor="description"
              className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description
              </label>
              <div>
                <textarea
                  id="description"
                  name="description"
                  type="text"
                  value={description}
                  onChange={onInput}
                  rows={4}
                  cols={35}
                  className="block rounded-md border-2"
                />
              </div>
            </div>
          </div>
        </div>
      <div className="flex justify-center my-5">
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
      <div className="flex justify-center">
        <Link
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        to="/user"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default EditEvent;

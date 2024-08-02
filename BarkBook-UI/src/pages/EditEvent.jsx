import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getEventById, updateEventById } from "../service/EventService";

const EditEvent = () => {

  let navigate = useNavigate();

  const { id } = useParams();

  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");

  const handleName = e => setName(e.target.value);
  const handleLocation = e => setLocation(e.target.value);
  const handleDate = e => setDate(e.target.value);
  const handleDescription = e => setDescription(e.target.value);

  useEffect(() => {
      const loadEvent = async () => {
          const result = await getEventById(id);
          setName(result.name);
          setLocation(result.location);
          setDate(result.date);
          setDescription(result.description);
      }
      loadEvent();
    }, [id]);

  const onSubmit = async (e) => {
    e.preventDefault();
      await updateEventById(id, name, location, date, description)
      navigate("/user")
  };

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
                  onChange={handleName}
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
                  onChange={handleLocation}
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
                  onChange={handleDate}
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
                  onChange={handleDescription}
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

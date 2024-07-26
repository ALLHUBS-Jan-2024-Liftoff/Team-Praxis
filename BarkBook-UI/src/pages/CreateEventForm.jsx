import React from "react";

const CreateEventForm = () => {
  return (
    <form>
      <h1 className="text-base font-semibold leading-7 flex justify-center">
          Create A New Event
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
        <button
        type="submit"
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CreateEventForm;

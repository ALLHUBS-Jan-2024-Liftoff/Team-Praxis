import React from "react";

const CreateEventForm = () => {
  return (
    <div>
      <div className="text-center">
        <h1>Create A New Event</h1>
        <br />
        <form>
          <div>
            <label>Event Name </label>
            <input
              className="border-2"
              id="name"
              placeholder="Enter text here..."
            ></input>
          </div>
          <br />
          <div>
            <label>Location </label>
            <input
              className="border-2"
              id="location"
              placeholder="Enter text here..."
            ></input>
          </div>
          <br />
          <div>
            <label>Event Date & Time </label>
            <input type="datetime-local" className="border-2"></input>
          </div>
          <br />
          <div>
            <label>Description </label>
            {/* <input className="border-2" id="description" placeholder="Descripe your event..."></input> */}
            <div className="grid place-content-center">
              <textarea
                id="about"
                name="about"
                rows={4}
                cols={45}
                className="block border-2 rounded-md"
                defaultValue={""}
              />
            </div>
          </div>
          <br />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEventForm;

const AddDog = () => {
    return (
        <form>
            
            {/* ---to be used later to upload pic---
            
            <div className="col-span-full"> 
              <label htmlFor="photo" className="block text-sm font-medium leading-6 text-gray-900">
                Photo
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon aria-hidden="true" className="h-12 w-12 text-gray-300" />
                <button
                  type="button"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Change
                </button>
              </div>
            </div> */}

        <div className="border-b border-gray-900/10 pb-12 flex justify-center">
          <h1 className="text-base font-semibold leading-7 flex justify-center">Enter your dog information</h1>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="dogName" className="block text-sm font-medium leading-6 text-gray-900">
                Dog name
              </label>
              <div className="mt-2">
                <input
                  id="dogName"
                  name="dogName"
                  type="text"
                  className="block w-3/4 rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="dogAge" className="block text-sm font-medium leading-6 text-gray-900">
                Age
              </label>
              <div className="mt-2">
                <input
                  id="dogAge"
                  name="dogAge"
                  type="number"
                  className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="breed" className="block text-sm font-medium leading-6 text-gray-900">
                Breed
              </label>
              <div className="mt-2">
                <select
                  id="breed"
                  name="breed"
                  className="block rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                >
                  <option>Germand Shepherd</option>
                  <option>Bulldog</option>
                  <option>Golden Retriever</option>
                  <option>Beagle</option>
                  <option>Corgi</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-1">
              <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-900">
                Weight (Pounds)
              </label>
              <div className="mt-2">
                <input
                  id="weight"
                  name="weight"
                  type="number"
                  className="block rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

          </div>
        </div>

        <div className="flex justify-center my-5">
        <button
          type="submit"
          className="rounded-md bg-black px-5 py-4 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Save
        </button>
      </div>


        </form>
    )
}
export default AddDog;
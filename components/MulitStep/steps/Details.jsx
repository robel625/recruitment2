import { useStepperContext } from "../../../contexts/StepperContext";

export default function Details() {
  const { userData, setUserData } = useStepperContext();
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className="flex flex-col ">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
         Country of Residence
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["country"] || ""}
            name="country"
            placeholder="enter your country"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800 "
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
        Region
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["region"] || ""}
            name="region"
            placeholder="enter your region"
            type="text"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          City
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["city"] || ""}
            name="city"
            placeholder="enter your City"
            type="text"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
    </div>
  );
}

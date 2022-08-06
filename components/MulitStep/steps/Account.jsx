import { useStepperContext } from "../../../contexts/StepperContext";

export default function Account() {
  const { userData, setUserData } = useStepperContext();

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="flex flex-col ">
      <div className="mx-2 w-full flex-1">
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["fullName"] || ""}
            name="fullName"
            placeholder="Enter your Full Name"
            type="text"
            required
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>
      <div className="mx-2 w-full flex-1">
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["email"] || ""}
            name="email"
            placeholder="email"
            type="email"
            required
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>
      <div className="mx-2 w-full flex-1">
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["phone"] || ""}
            name="phone"
            placeholder="enter your phone"
            type="text"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>
      

        <div className="mx-2 w-full flex-1">
          <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
            <select
              onChange={handleChange}
              value={userData["gender"] || ""}
              name="gender"
              placeholder="mail or femail"
              type="text"
              className="w-full appearance-none p-1 px-2 text-gray-800 outline-none">
                <option value="" disabled selected hidden>Gender:</option>
                 <option value='Mail'>Mail</option>
                 <option value='Femail'>Female</option>
            </select>
        </div>
      </div>

      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Date of Birth:
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["birthdate"] || ""}
            name="birthdate"
            placeholder="Date of Birth:"
            type="Date"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>

          
      
      

    </div>
  );
}

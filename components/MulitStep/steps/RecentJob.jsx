import { useStepperContext } from "../../../contexts/StepperContext";

export default function RecentJob() {
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
            value={userData["job_title"] || ""}
            name="job_title"
            placeholder="Job title (Example: Customr Service)"
            type="text"
            require
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>

      <div className="mx-2 w-full flex-1">
          <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
            <select
              onChange={handleChange}
              value={userData["job_specialization"] || ""}
              name="job_specialization"
              placeholder="Job"
              type="text"
              className="w-full appearance-none p-1 px-2 text-gray-800 outline-none">
                <option value="" disabled selected hidden>Job specialization:</option>
                <option value="Administrative">Administrative</option><option value="Banking / Finance / Insurance">Banking / Finance / Insurance</option><option value="Building Design / Architecture">Building Design / Architecture</option>
		    	  <option value="Construction / Building">Construction / Building</option><option value="Consulting/Business Strategy & Planning">Consulting/Business Strategy &amp; Planning</option><option value="Customer Service">Customer Service</option>
		    	  <option value="Engineering">Engineering</option><option value="Executive / Top Management">Executive / Top Management</option><option value="Healthcare / Pharmaceutical">Healthcare / Pharmaceutical </option>
		    	  <option value="Hospitality / Leisure / Travels">Hospitality / Leisure / Travels</option><option value="Human Resources">Human Resources</option><option value="Information Technology">Information Technology</option>
		    	  <option value="Legal">Legal</option><option value="Manufacturing / Production">Manufacturing / Production</option><option value="Media / Public Relations / Advertising">Media / Public Relations / Advertising</option>
		    	  <option value="Media/Journalism">Media/Journalism</option><option value="NGO">NGO</option><option value="Oil &amp; Gas">Oil &amp; Gas</option>
		    	  <option value="Project Management">Project Management</option><option value="Real Estate / Property">Real Estate / Property</option><option value="Sales / Marketing / Bus. Dev.">Sales / Marketing / Bus. Dev.</option>
		    	  <option value="Teaching / Education">Teaching / Education</option><option value="Telecommunications">Telecommunications</option>
            </select>
        </div>
      </div>

      <div className="mx-2 w-full flex-1">
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["company"] || ""}
            name="company"
            placeholder="Institute or Company name"
            type="email"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>
            
        <div className="mx-2 w-full flex-1">
          <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
            <select
              onChange={handleChange}
              value={userData["industry"] || ""}
              name="industry"
              placeholder="mail or femail"
              type="text"
              className="w-full appearance-none p-1 px-2 text-gray-800 outline-none">
                <option value="" disabled selected hidden>Industry:</option>
                <option value="Agriculture / Poultry / Fishing">Agriculture / Poultry / Fishing</option><option value="Banking / Financial Services">Banking / Financial Services</option>
				<option value="Construction / Real Estate">Construction / Real Estate</option><option value="Consulting">Consulting</option><option value="Creatives / Art / Design">Creatives / Art / Design</option>
				<option value="Ecommerce / Internet">Ecommerce / Internet</option><option value="Education">Education</option><option value="Engineering">Engineering</option>
				<option value="FMCG">FMCG</option><option value="Food">Food Services</option><option value="Government / Defence">Government / Defence</option>
				<option value="Healthcare">Healthcare</option><option value="Hospitality / Leisure">Hospitality / Leisure</option><option value="ICT / Telecommunications">ICT / Telecommunications</option>
				<option value="Insurance">Insurance</option><option value="Legal">Legal</option><option value="Logistics / Transportation">Logistics / Transportation</option>
				<option value="Manufacturing / Production">Manufacturing / Production</option><option value="Media">Media</option><option value="NGO">NGO</option>
				<option value="Oil & Gas / Mining">Oil &amp; Gas / Mining</option><option value="Power / Energy">Power / Energy</option><option value="Retail / Wholesales">Retail / Wholesales</option>
				<option value="Trade / Services">Trade / Services</option><option value="Travels / Tours">Travels / Tours</option><option value="Blue Collar">Blue Collar</option>
            </select>
        </div>
      </div>

      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          From:
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["job_from"] || ""}
            name="job_from"
            placeholder="From:"
            type="Date"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>

      <div className="mx-2 w-full flex-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          To:
        </div>
        <input type="checkbox" value={userData["current_working"] || ""} id="current_working" name="current_working" />
        <label htmlFor="current_job"> I currently work here</label>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["job_to"] || ""}
            name="job_to"
            placeholder="To"
            type="Date"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>

         
    </div>
  );
}

import React from 'react'
import axios from "axios" 
import { useEffect, useState } from "react";
import { parseCookies } from "nookies"
import { toast } from "react-toastify"
import { useSession } from "next-auth/react";

function Profile() {
  const cookies = parseCookies()
  const { data: session } = useSession();

  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : ""

  const [userinfo, setUserinfo] = useState("");
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const user_id = user._id
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies?.token}`
          },
        }
      const response = await axios.get(
        `/api/admin/userinfo/${user_id}`,
        config
      ) 

      setUserinfo(response.data);
      } catch (error) {
        toast.error(error.response)
      }
    }
    fetchPosts();
  }, []);


  const updateUserinfo = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies?.token}`
        },
      }
   
      const user_id = user._id
      const full_name = userinfo.full_name
      const user_email = userinfo.user_email
      const phone = userinfo.phone
      const gender = userinfo.gender
      const birthdate = userinfo.birthdate
      const country = userinfo.country
      const region = userinfo.region
      const city = userinfo.city
      const institute = userinfo.institute
      const study = userinfo.study
      const degree = userinfo.degree
      const cgpa = userinfo.cgpa
      const study_from = userinfo.study_from
      const study_to = userinfo.study_to
      const job_title = userinfo.job_title
      const job_specialization = userinfo.job_specialization
      const company = userinfo.company
      const industry = userinfo.industry
      const job_from = userinfo.job_from
      const job_to = userinfo.job_to

      
      
      const { data } = await axios.post(
        `/api/admin/userinfo/${user_id}`,
        {     full_name, user_email, phone ,gender ,birthdate ,country ,region ,city , institute,
               study ,degree ,cgpa ,study_from ,study_to ,job_title ,job_specialization, 
                company ,industry ,job_from ,job_to },
        config
      )

      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }

  const handleInput = (e) => {
    // console.log(e.target.name, " : ", e.target.value);
    setUserinfo({ ...userinfo, [e.target.name]: e.target.value });
  };

  

  return (
    <div>


<div className="hidden sm:block" aria-hidden="true">
  <div className="py-5">
    <div className="border-t border-gray-200"></div>
  </div>
</div>

<div className="mt-10 sm:mt-0">
  <div className="md:grid md:grid-cols-3 md:gap-6">
    <div className="md:col-span-1">
      <div className="px-4 ">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
        <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
      </div>
    </div>
    <div className="mt-5 md:mt-0 md:col-span-2">
      <form action="#" method="POST">
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Full name</label>
                <input value={userinfo.full_name}  onChange={handleInput}
                   type="text" name="full_name" id="full_name" autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="user_email" className="block text-sm font-medium text-gray-700">Email address</label>
                <input value={userinfo.user_email} onChange={handleInput}
                  type="text" name="user_email" id="user_email" autoComplete="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone number</label>
                <input value={userinfo.phone} onChange={handleInput}
                  type="text" name="phone" id="phone" autoComplete="phone" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
                <select value={userinfo.gender} onChange={handleInput}
                   id="gender" name="gender" autoComplete="gender-type" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="" disabled selected hidden>Gender:</option>
                  <option value='Mail'>Mail</option>
                  <option value='Femail'>Female</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">DATE OF BIRTH</label>
                <input value={userinfo.birthdate}  onChange={handleInput}
                  type="Date" name="birthdate" id="birthdate" autoComplete="birthdate" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
                <input value={userinfo.country} onChange={handleInput}
                  type="text" name="country" id="country" autoComplete="country-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="region" className="block text-sm font-medium text-gray-700">Region</label>
                <input value={userinfo.region} onChange={handleInput} 
                type="text" name="region" id="region" autoComplete="region-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
                <input value={userinfo.city} onChange={handleInput}
                 type="text" name="city" id="city" autoComplete="address-level2" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6">
                <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">Street address</label>
                <input type="text" name="street-address" id="street-address" autoComplete="street-address" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
                <input type="text" name="state" id="state" autoComplete="address-level1" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                <input type="text" name="postal-code" id="postal-code" autoComplete="postal-code" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
            </div>
          </div>
          {/* <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit" onClick={() => updateUserinfo()}   className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
          </div> */}
        </div>
      </form>
    </div>
  </div>
</div>


<div className="hidden sm:block" aria-hidden="true">
  <div className="py-5">
    <div className="border-t border-gray-200"></div>
  </div>
</div>

<div className="mt-10 sm:mt-0">
  <div className="md:grid md:grid-cols-3 md:gap-6">
    <div className="md:col-span-1">
      <div className="px-4 sm:px-0">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
        <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
      </div>
    </div>
    <div className="mt-5 md:mt-0 md:col-span-2">
      <form action="#" method="POST">
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="institute" className="block text-sm font-medium text-gray-700">School or Institute</label>
                <input value={userinfo.institute}  onChange={handleInput}
                  type="text" name="institute" id="institute" autoComplete="institute" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="study" className="block text-sm font-medium text-gray-700">Field of study</label>
                <input value={userinfo.study} onChange={handleInput}
                  type="text" name="study" id="study" autoComplete="study-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="degree" className="block text-sm font-medium text-gray-700">Degree</label>
                <select value={userinfo.degree} onChange={handleInput}
                 id="degree" name="degree" autoComplete="degree" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <option value="" disabled selected hidden>Select:</option>
										<option value="Diploma degree">Diploma degree</option>
										<option value="Bachelor/s degree">Bachelors degree</option>
										<option value="Doctor of Education - EdD">Doctor of Education - EdD</option>
										<option value="Doctor of Law - JD">Doctor of Law - JD</option>
										<option value="Master/s degree">Masters degree</option>
										<option value="Engineer/s degree">Engineers degree</option>
										<option value="Doctor of Philosophy - phD"> Doctor of Philosophy - phD</option>
										<option value="Other">Other</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label htmlFor="cgpa" className="block text-sm font-medium text-gray-700">CGPA</label>
                <input value={userinfo.cgpa} onChange={handleInput}
                  type="text" name="cgpa" id="cgpa" autoComplete="cgpa" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="study_from" className="block text-sm font-medium text-gray-700">From year:</label>
                <select value={userinfo.study_from} onChange={handleInput}
                 id="study_from" name="study_from" autoComplete="study_from" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                       <option value="" disabled selected hidden>From year:</option>
										   <option value="2026">2026</option><option value="2025">2025</option><option value="2024">2024</option><option value="2023">2023</option>
										   <option value="2022">2022</option><option value="2021">2021</option><option value="2020">2020</option><option value="2019">2019</option>
										   <option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option>
										   <option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option>
										   <option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option>
										   <option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option>
										   <option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option>
										   <option value="1998">1998</option><option value="1997">1997</option><option value="1996">1996</option><option value="1995">1995</option>
										   <option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option>
										   <option value="1990">1990</option><option value="1989">1989</option><option value="1988">1988</option><option value="1987">1987</option>
										   <option value="1986">1986</option><option value="1985">1985</option><option value="1984">1984</option><option value="1983">1983</option>
										   <option value="1982">1982</option><option value="1981">1981</option><option value="1980">1980</option><option value="1979">1979</option>
										   <option value="1978">1978</option><option value="1977">1977</option><option value="1976">1976</option><option value="1975">1975</option>
										   <option value="1974">1974</option><option value="1973">1973</option><option value="1972">1972</option><option value="1971">1971</option>
										   <option value="1970">1970</option><option value="1969">1969</option><option value="1968">1968</option><option value="1967">1967</option>
										   <option value="1966">1966</option><option value="1965">1965</option><option value="1964">1964</option><option value="1963">1963</option>
										   <option value="1962">1962</option><option value="1961">1961</option><option value="1960">1960</option><option value="1959">1959</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="study_to" className="block text-sm font-medium text-gray-700">To year (or expected)</label>
                <select value={userinfo.study_to} onChange={handleInput}
                  id="study_to" name="study_to" autoComplete="study_to" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                       <option value="" disabled selected hidden>To year (or expected)</option>
										   <option value="2026">2026</option><option value="2025">2025</option><option value="2024">2024</option><option value="2023">2023</option>
										   <option value="2022">2022</option><option value="2021">2021</option><option value="2020">2020</option><option value="2019">2019</option>
										   <option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option>
										   <option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option>
										   <option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option>
										   <option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option>
										   <option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option>
										   <option value="1998">1998</option><option value="1997">1997</option><option value="1996">1996</option><option value="1995">1995</option>
										   <option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option>
										   <option value="1990">1990</option><option value="1989">1989</option><option value="1988">1988</option><option value="1987">1987</option>
										   <option value="1986">1986</option><option value="1985">1985</option><option value="1984">1984</option><option value="1983">1983</option>
										   <option value="1982">1982</option><option value="1981">1981</option><option value="1980">1980</option><option value="1979">1979</option>
										   <option value="1978">1978</option><option value="1977">1977</option><option value="1976">1976</option><option value="1975">1975</option>
										   <option value="1974">1974</option><option value="1973">1973</option><option value="1972">1972</option><option value="1971">1971</option>
										   <option value="1970">1970</option><option value="1969">1969</option><option value="1968">1968</option><option value="1967">1967</option>
										   <option value="1966">1966</option><option value="1965">1965</option><option value="1964">1964</option><option value="1963">1963</option>
										   <option value="1962">1962</option><option value="1961">1961</option><option value="1960">1960</option><option value="1959">1959</option>
                </select>
              </div>

            </div>
          </div>
          {/* <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit"  onClick={() => updateUserinfo()}  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
          </div> */}
        </div>
      </form>
    </div>
  </div>
</div>

<div className="hidden sm:block" aria-hidden="true">
  <div className="py-5">
    <div className="border-t border-gray-200"></div>
  </div>
</div>

<div className="mt-10 sm:mt-0">
  <div className="md:grid md:grid-cols-3 md:gap-6">
    <div className="md:col-span-1">
      <div className="px-4 sm:px-0">
        <h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
        <p className="mt-1 text-sm text-gray-600">Use a permanent address where you can receive mail.</p>
      </div>
    </div>
    <div className="mt-5 md:mt-0 md:col-span-2">
      <form action="#" method="POST">
        <div className="shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="job_title" className="block text-sm font-medium text-gray-700">Job Title</label>
                <input value={userinfo.job_title} onChange={handleInput}
                  type="text" name="job_title" id="job_title" autoComplete="job_title" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="job_specialization" className="block text-sm font-medium text-gray-700">Job_specialization</label>
                <select value={userinfo.job_specialization} onChange={handleInput}
                  id="job_specialization" name="job_specialization" autoComplete="job_specialization" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700">Institute or Company name</label>
                <input value={userinfo.company}  onChange={handleInput}
                 type="text" name="company" id="company" autoComplete="company name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-4">
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
                <select value={userinfo.industry} onChange={handleInput}
                 id="industry" name="industry" autoComplete="industry" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
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

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="job_from" className="block text-sm font-medium text-gray-700">From year:</label>
                <select value={userinfo.job_from} onChange={handleInput}
                  id="job_from" name="job_from" autoComplete="jobfrom_year" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                       <option value="" disabled selected hidden>From year:</option>
										   <option value="2026">2026</option><option value="2025">2025</option><option value="2024">2024</option><option value="2023">2023</option>
										   <option value="2022">2022</option><option value="2021">2021</option><option value="2020">2020</option><option value="2019">2019</option>
										   <option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option>
										   <option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option>
										   <option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option>
										   <option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option>
										   <option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option>
										   <option value="1998">1998</option><option value="1997">1997</option><option value="1996">1996</option><option value="1995">1995</option>
										   <option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option>
										   <option value="1990">1990</option><option value="1989">1989</option><option value="1988">1988</option><option value="1987">1987</option>
										   <option value="1986">1986</option><option value="1985">1985</option><option value="1984">1984</option><option value="1983">1983</option>
										   <option value="1982">1982</option><option value="1981">1981</option><option value="1980">1980</option><option value="1979">1979</option>
										   <option value="1978">1978</option><option value="1977">1977</option><option value="1976">1976</option><option value="1975">1975</option>
										   <option value="1974">1974</option><option value="1973">1973</option><option value="1972">1972</option><option value="1971">1971</option>
										   <option value="1970">1970</option><option value="1969">1969</option><option value="1968">1968</option><option value="1967">1967</option>
										   <option value="1966">1966</option><option value="1965">1965</option><option value="1964">1964</option><option value="1963">1963</option>
										   <option value="1962">1962</option><option value="1961">1961</option><option value="1960">1960</option><option value="1959">1959</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="job_to" className="block text-sm font-medium text-gray-700">To year</label>
                <select value={userinfo.job_to} onChange={handleInput}
                  id="job_to" name="job_to" autoComplete="jobto_year" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                       <option value="" disabled selected hidden>To year:</option>
										   <option value="2026">2026</option><option value="2025">2025</option><option value="2024">2024</option><option value="2023">2023</option>
										   <option value="2022">2022</option><option value="2021">2021</option><option value="2020">2020</option><option value="2019">2019</option>
										   <option value="2018">2018</option><option value="2017">2017</option><option value="2016">2016</option><option value="2015">2015</option>
										   <option value="2014">2014</option><option value="2013">2013</option><option value="2012">2012</option><option value="2011">2011</option>
										   <option value="2010">2010</option><option value="2009">2009</option><option value="2008">2008</option><option value="2007">2007</option>
										   <option value="2006">2006</option><option value="2005">2005</option><option value="2004">2004</option><option value="2003">2003</option>
										   <option value="2002">2002</option><option value="2001">2001</option><option value="2000">2000</option><option value="1999">1999</option>
										   <option value="1998">1998</option><option value="1997">1997</option><option value="1996">1996</option><option value="1995">1995</option>
										   <option value="1994">1994</option><option value="1993">1993</option><option value="1992">1992</option><option value="1991">1991</option>
										   <option value="1990">1990</option><option value="1989">1989</option><option value="1988">1988</option><option value="1987">1987</option>
										   <option value="1986">1986</option><option value="1985">1985</option><option value="1984">1984</option><option value="1983">1983</option>
										   <option value="1982">1982</option><option value="1981">1981</option><option value="1980">1980</option><option value="1979">1979</option>
										   <option value="1978">1978</option><option value="1977">1977</option><option value="1976">1976</option><option value="1975">1975</option>
										   <option value="1974">1974</option><option value="1973">1973</option><option value="1972">1972</option><option value="1971">1971</option>
										   <option value="1970">1970</option><option value="1969">1969</option><option value="1968">1968</option><option value="1967">1967</option>
										   <option value="1966">1966</option><option value="1965">1965</option><option value="1964">1964</option><option value="1963">1963</option>
										   <option value="1962">1962</option><option value="1961">1961</option><option value="1960">1960</option><option value="1959">1959</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-2">
                <label htmlFor="here" className="block text-sm font-medium text-gray-700">I currently work here</label>
                <input type="checkbox"  
                //  onChange={(e) => setJob_to(e.target.checked)} 
                 name="here" id="here"/>
              </div>

            </div>
          </div>
          {/* <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button type="submit" onClick={() => updateUserinfo()}  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
          </div> */}
        </div>
      </form>
    </div>
  </div>
</div>

<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button onClick={() => updateUserinfo()}   className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
  </div>

      
    </div>
  )
}

export default Profile

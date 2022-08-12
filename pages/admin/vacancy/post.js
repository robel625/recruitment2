import React from 'react'
import axios from "axios" 
import { useEffect, useState } from "react";
import { parseCookies } from "nookies"
import { toast } from "react-toastify"
import { useSession } from "next-auth/react";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

function PostJob() {
  const { quill, quillRef } = useQuill();
    const [jobid, setJobid] = useState("");
    const [position, setPosition] = useState("");
    const [company_name, setCompanyname] = useState("");
    const [status, setStatus] = useState("");
    const [location, setLocation] = useState("");
    const [availability, setAvailability] = useState("");
    const [level, setLevel] = useState("");
    const [salary, setSalary] = useState("");
    const [deadline, setDeadline] = useState("");
    const [miniDesc, setMiniDesc] = useState("");
    // const [descripition, setDescription] = useState("");


  const cookies = parseCookies()
  const { data: session } = useSession();

  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : ""

    
  const postJobinfo = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies?.token}`
        },
      }
       const postedby =  user._id
       const descripition = quill.root.innerHTML
      const { data } = await axios.post(
        `/api/admin/job`,
        { jobid, position, company_name, status, location, availability, level, salary,
          deadline, miniDesc, descripition, postedby },
        config
      )

      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }
  
  

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
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">Job Id</label>
                <input value={jobid}  onChange={(e) => setJobid(e.target.value)}
                   type="text" name="full_name" id="full_name" autoComplete="given-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="user_email" className="block text-sm font-medium text-gray-700">Position Name</label>
                <input value={position} onChange={(e) => setPosition(e.target.value)}
                  type="text" name="user_email" id="user_email" autoComplete="email" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Company Name</label>
                <input value={company_name} onChange={(e) => setCompanyname(e.target.value)}
                  type="text" name="phone" id="phone" autoComplete="phone" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}
                   id="gender" name="gender" autoComplete="gender-type" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="" disabled selected hidden> Select Status</option>  
                  <option value='Active'>Active</option>
                  <option value='Closed'>Closed</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">Deadline</label>
                <input value={deadline} onChange={(e) => setDeadline(e.target.value)}
                  type="Date" name="birthdate" id="birthdate" autoComplete="birthdate" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="country" className="block text-sm font-medium text-gray-700">Work Place</label>
                <input value={location}  onChange={(e) => setLocation(e.target.value)} 
                  type="text" name="country" id="country" autoComplete="country-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="region" className="block text-sm font-medium text-gray-700">Career level</label>
                <input value={level} onChange={(e) => setLevel(e.target.value)} 
                type="text" name="region" id="region" autoComplete="region-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>
              
              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="region" className="block text-sm font-medium text-gray-700">Availability</label>
                <input value={availability} onChange={(e) => setAvailability(e.target.value)} 
                type="text" name="region" id="region" autoComplete="region-name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">Salary</label>
                <input value={salary} onChange={(e) => setSalary(e.target.value)}
                 type="text" name="city" id="city" autoComplete="address-level2" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6">
                <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">Mini Descripition</label>
                <input value={miniDesc} onChange={(e) => setMiniDesc(e.target.value)}
                type="text" name="street-address" id="street-address" autoComplete="street-address" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6">
                <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">Descripition</label>
                <div style={{ width: 700, height: 250 }} className='bg-white'>
                   <div ref={quillRef}
                     value={quill}
                     />
                </div>
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




<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button onClick={() => postJobinfo()}   className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
  </div>

      
    </div>
  )
}

export default PostJob

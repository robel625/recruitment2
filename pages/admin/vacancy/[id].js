import React from 'react'
import axios from "axios" 
import { useEffect, useState } from "react";
import { parseCookies } from "nookies"
import { toast } from "react-toastify"
import { useSession } from "next-auth/react";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";

function Profile({ job }) {
  const { quill, quillRef } = useQuill();

  const cookies = parseCookies()
  const { data: session } = useSession();

  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : ""

  const [jobinfo, setJobinfo] = useState("");
  console.log('jobinfo',jobinfo)

  console.log('job',job)
  useEffect(() => {
          setJobinfo(job);
  }, []);
  
  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     try {
  //       const user_id = user._id
  //       const config = {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${cookies?.token}`
  //         },
  //       }
  //     const response = await axios.get(
  //       `/api/admin/jobinfo/${user_id}`,
  //       config
  //     ) 

  //     setJobinfo(response.data);
  //     } catch (error) {
  //       toast.error(error.response)
  //     }
  //   }
  //   fetchPosts();
  // }, []);


  const updatevacancy = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies?.token}`
        },
      }
   
      const postedby = user._id
      const jobid = jobinfo.jobid
      const position = jobinfo.position
      const company_name = jobinfo.company_name
      const status = jobinfo.status
      const location = jobinfo.location
      const availability = jobinfo.availability
      const level = jobinfo.level
      const salary = jobinfo.salary
      const deadline = jobinfo.deadline
      const miniDesc = jobinfo.miniDesc
      const descripition = quill.root.innerHTML

      
      const { data } = await axios.put(
        `/api/admin/vacancy/${job._id}`,
        {     jobid, position, company_name, status, location, availability, level, salary,
          deadline, miniDesc, descripition, postedby },
        config
      )

      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }

  const handleInput = (e) => {
    console.log(e.target.name, " : ", e.target.value);
    setJobinfo({ ...jobinfo, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (quill) {
      // quill.clipboard.dangerouslyPasteHTML('<h1> TiTle</h1><ol><li>asdfasdf oreder list</li><li>sadfaf</li><li>asdfas</li></ol><p>asdfjhaslkjdfhajkshdfkjh pargtaph</p><h2> Responcebility</h2><ul><li>unorderlist</li><li>sdfsd</li><li>asdfsa</li></ul><h3> color</h3><p><strong style="background-color: rgb(0, 138, 0);">asdfasfasdfasdfsdfasdfasdfsfadf</strong></p><p><span style="color: rgb(178, 178, 0);">asdfsdfasddaasdfasdfasdfasdfadf</span></p><p><u style="color: rgb(178, 178, 0);">aasdfasdfasfadfsfaasfdfasfasfd</u></p>');
      quill.clipboard.dangerouslyPasteHTML(job.descripition);
    }
  }, [quill]);
  

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
                <label htmlFor="jobid" className="block text-sm font-medium text-gray-700">Job Id</label>
                <input value={jobinfo.jobid}  onChange={handleInput}
                   type="text" name="jobid" id="jobid" autoComplete="jobid" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="position" className="block text-sm font-medium text-gray-700">Position Name</label>
                <input value={jobinfo?.position} onChange={handleInput}
                  type="text" name="position" id="position" autoComplete="position" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">Company Name</label>
                <input value={jobinfo?.company_name} onChange={handleInput}
                  type="text" name="company_name" id="company_name" autoComplete="company_name" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                <select value={jobinfo?.status} onChange={handleInput}
                   id="status" name="status" autoComplete="status" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  <option value="" disabled selected hidden> Select Status</option>  
                  <option value='Active'>Active</option>
                  <option value='Closed'>Closed</option>
                </select>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
                <input value={jobinfo?.deadline}  onChange={handleInput}
                  type="Date" name="deadline" id="deadline" autoComplete="deadline" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Work Place</label>
                <input value={jobinfo?.location} onChange={handleInput}
                  type="text" name="location" id="location" autoComplete="location" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="level" className="block text-sm font-medium text-gray-700">Career level</label>
                <input value={jobinfo?.level} onChange={handleInput} 
                type="text" name="level" id="level" autoComplete="level" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label htmlFor="availability" className="block text-sm font-medium text-gray-700">Availability</label>
                <input value={jobinfo?.availability} onChange={handleInput}  
                type="text" name="availability" id="availability" autoComplete="availability" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                <label htmlFor="salary" className="block text-sm font-medium text-gray-700">Salary</label>
                <input value={jobinfo?.salary} onChange={handleInput}
                 type="text" name="salary" id="salary" autoComplete="salary" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6">
                <label htmlFor="miniDesc" className="block text-sm font-medium text-gray-700">Mini Descripition</label>
                <input value={jobinfo?.miniDesc} onChange={handleInput}
                 type="text" name="miniDesc" id="miniDesc" autoComplete="miniDesc" className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>
              </div>

              <div className="col-span-6 h-80">
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




<div className=" px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button onClick={() => updatevacancy()}   className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
  </div>

      
    </div>
  )
}

export const getServerSideProps = async (req) => {
  ;
  const {
    query: { id },
  } = req;
  const { db } = await connectToDatabase();
 const job = await db
   .collection("jobs").findOne({ _id: new ObjectId(id) });
 
   
  //  const res = await axios.get(`http://localhost:3000/api/jobs/${params.id}`
  //   );

  return {
    props: {
      job : 
      {_id: job._id.toString(),
        jobid:job.jobid,
        position:job.position,
        company_name:job.company_name,
        status:job.status,
        location:job.location,
        availability:job.availability,
        level:job.level,
        salary:job.salary,
        deadline:job.deadline,
        miniDesc: job.miniDesc,
        descripition: job.descripition,
        // postedby: job.postedby,

      }
    },
  };
};

export default Profile

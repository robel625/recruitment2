
import Add from "./Add";
import MultiStep from "./MultiStep"
import axios from "axios";
import { useEffect, useState } from "react";
import {paginatePosts } from "../../redux/posts/postActions"
import { useDispatch, useSelector } from "react-redux"
import FrontPaginate from "./FrontPaginate";
import { parseCookies } from "nookies"
import { toast } from "react-toastify"
import Link from 'next/link';
import { useRouter } from "next/router";

    

function ApplicationsList() {
    const [close, setClose] = useState(true)
    const [deleted, setDeleted] = useState(false)
    const [position1, setPosition] = useState("")
    const [name1, setName] = useState("")
    const [email1, setEmail] = useState("")
    const [status1, setStatus] = useState("")
    const [realtimeApplicant, setRealtimeApplicants] = useState("")

    const cookies = parseCookies()
    const router = useRouter()

   
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookies?.token}`
            },
          }
        const application = await axios.get(
          `/api/admin/job`,
          config
        ) 
        setRealtimeApplicants(application.data);
        } catch (error) {
          toast.error(error.response)
        }
      }
      fetchPosts();
    }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = realtimeApplicant && realtimeApplicant.slice(indexOfFirstPost, indexOfLastPost);


  const paginate = pageNumber => setCurrentPage(pageNumber);


 
    const deleteApplicantion = async (application) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies?.token}`
          },
        }
      const response = await axios.delete(
        `/api/admin/${application._id}`,
        config
      ) 
      const number = 1
      dispatch(paginatePosts(number))
      toast.success(response.message)
      } catch (error) {
        toast.error(error.response)
      }
    };

    const handleSearch = async () => {
      const application2 = await axios.post(`/api/admin/search`,{ position1, name1, email1, status1},
      {headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies?.token}`
      }}
      ) 
      console.log('application2', application2)
      setRealtimeApplicants(application2.data);
      console.log('application2.data', application2.data)
    }


  return (
    
        <div className=''>
            <div className="p-5 md:w-auto bg-gray-100">
                 <div className='mb-2 w-auto h-auto flex  items-start justify-between'>
                    <div className=' text-2xl font-bold ' >Appication List</div>
                    <div className=' p-2 bg-blue-700 rounded-lg' onClick={() => setClose(false)}>+ New Applicant</div>
                    
                </div>
                {!close && <MultiStep setClose={setClose} />}   
                {/* // pizza 2:22 time */}
                <div className='flex items-center justify-center mb-2'>
                    <div className=' text-xl font-semibold ' >Position :</div>
                    <span className='ml-2 '>
                        <select className='border-none outline-none px-2 '>
                             <option>All</option>
                             <option>web developer</option>
                             <option>50</option>
                             <option>100</option>
                        </select>
                     </span>
                </div>
                <div className='mb-2 text-md  w-auto h-auto flex  items-start justify-between'>
                  <div className=' ' >
                     show
                     <span className='ml-2'>
                        <select>
                             <option>10</option>
                             <option>25</option>
                             <option>50</option>
                             <option>100</option>
                        </select>
                     </span>
                     <span className='ml-2'>entries</span>
                  </div>
                  <div className="flex-col">
                  <div className='ml-2 flex items-start'>
                      <div className=''> position:</div>
                      <input onChange={(e) => setPosition(e.target.value)} className='ml-2 mb-2 border-none outline-none px-2 '></input>
                 </div>
                 <div className='ml-2 flex items-start'>
                      <div className=''> Name:</div>
                      <input onChange={(e) => setName(e.target.value)} className='ml-2 mb-2 border-none outline-none px-2 '></input>
                 </div>
                 <div className='ml-2 flex items-start'>
                      <div className=''> Email:</div>
                      <input onChange={(e) => setEmail(e.target.value)} className='ml-2 mb-2 border-none outline-none px-2 '></input>
                 </div>
                 <div className='ml-2 flex items-start'>
                      <div className=''> status:</div>
                      <input onChange={(e) => setStatus(e.target.value)} className='ml-2 mb-2 border-none outline-none px-2 '></input>
                      <button  onClick={handleSearch}
                      className='ml-1 p-1.5 text-xs font-medium uppercase tracking-wider text-blue-800 bg-blue-200 rounded-md'>Search</button>
                 </div>
                 </div>
               </div>
                
                <div className="overflow-auto rounded-lg shadow hidden md:block">
                   <table className="w-full">
                      <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">#</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-center">Applicant Information</th>
                        <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">Email</th>
                        <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">Status</th>
                        <th className="w-32 p-3 text-sm font-semibold tracking-wide text-center">Action</th>
                      </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                      {currentPosts && currentPosts.map((j) =>
                         <tr key={j._id} clasNames="bg-white">
                           <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                             <a href="#" className="font-bold text-blue-500 hover:underline">1</a>
                           </td>
                           <td className="p-3 text-md font-semibold text-gray-700 whitespace-nowrap">
                             Name : {j.name}
                             <p className='text-xs font-normal'> Applied for : {j.position} </p>
                           </td>
                           <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">{j.email}</td>
                           <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">{j.stage}</td>
                           <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                              <Link href={`/admin/view/${j._id}`}>
                                 <button className='ml-1 p-1.5 text-xs font-medium uppercase tracking-wider text-blue-800 bg-blue-200 rounded-md'>View</button>
                               </Link>
                                <button onClick={() => deleteApplicantion(j)}
                                className='ml-1 p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-md'>Delete</button>
                           </td>
                         </tr>
                          )}
                         
                      </tbody>
                    </table> 
                </div>
                <div className='mt-2 w-auto h-auto flex  items-start justify-between'>
                    <div className='' >Showing 1 to 10 of 11 entries</div>
                    <FrontPaginate postsPerPage={postsPerPage}
                        totalPosts={realtimeApplicant.length}
                        paginate={paginate}/>
                </div>
          </div>
    </div>
  )
}

export default ApplicationsList
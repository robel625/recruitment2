import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../../atoms/modalAtom";
import { useEffect, useState } from "react";
import { handlePostState, useSSRPostsState } from "../../atoms/postAtom";
import Link from 'next/link';

import FrontPaginate from "./FrontPaginate";

import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css'; 
import DOMPurify from "dompurify";

function VacancyList({ jobs }) {
  const { quill, quillRef } = useQuill();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [realtimePosts, setRealtimePosts] = useState([]);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);
 
//   jobs.map((job) =>
//   console.log(root.innerHTML(job.descripition)
// ))
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/jobs", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await response.json();
      setRealtimePosts(responseData);
      

      if(handlePost === true){
        setUseSSRPosts(false)
      }

      setHandlePost(false);
    };

    fetchPosts();
  }, [handlePost]);

  // useEffect(() => {
  //   if (quill) {
  //     quill.clipboard.dangerouslyPasteHTML('<h1> TiTle</h1><ol><li>asdfasdf oreder list</li><li>sadfaf</li><li>asdfas</li></ol><p>asdfjhaslkjdfhajkshdfkjh pargtaph</p><h2> Responcebility</h2><ul><li>unorderlist</li><li>sdfsd</li><li>asdfsa</li></ul><h3> color</h3><p><strong style="background-color: rgb(0, 138, 0);">asdfasfasdfasdfsdfasdfasdfsfadf</strong></p><p><span style="color: rgb(178, 178, 0);">asdfsdfasddaasdfasdfasdfasdfadf</span></p><p><u style="color: rgb(178, 178, 0);">aasdfasdfasfadfsfaasfdfasfasfd</u></p>');
  //   }
  // }, [quill]);

  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  
  useEffect(() => {
    setRealtimePosts(jobs)
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = realtimePosts && realtimePosts.slice(indexOfFirstPost, indexOfLastPost);


  const paginate = pageNumber => setCurrentPage(pageNumber);

  
  const deletePost = async (job) => {
    const response = await fetch(`/api/jobs/${job._id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    setHandlePost(true);
    //setModalOpen(false);
  };

  //Text='<%# Bind("<h1>tiltl</h1><h4>Content</h4>") %>'

  

  return (
    <div className=' '>
           {/* {jobs.map((job) =>
             

            //    <div
            //    style={{ padding: "10px", fontSize: "17px" }}
            //    //dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(job.descripition) }}
            //  ></div>

            <div style={{ width: 500, height: 300 }}>
               <div ref={quillRef} />
            </div>
               
           )} */}

          
      
        <div>
            <div className="p-5 h-screen w-screen md:w-auto bg-gray-100">
                 <div className='mb-2 w-auto h-auto flex  items-start justify-between'>
                    <div className=' text-2xl font-bold ' >Vacancy List</div>
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="p-2 bg-blue-700 rounded-lg"
                        onClick={() => {
                         setModalOpen(true);
                         setModalType("dropIn");
                       }}
                       >
                        + New Vacancy
                    </motion.button>
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
                  <div className='ml-2 flex items-start'>
                      <div className=''> search:</div>
                      <input className='ml-2 border-none outline-none px-2  '></input>
                 </div>
               </div>
                
                <div className="overflow-auto rounded-lg shadow hidden md:block">
                   <table className="w-full">
                      <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">#</th>
                        <th className="p-3 text-sm font-semibold tracking-wide text-center">Vacancy Information</th>
                        <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">Availability</th>
                        <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">Status</th>
                        <th className="w-32 p-3 text-sm font-semibold tracking-wide text-center">Action</th>
                      </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                         
                        {currentPosts && currentPosts.map((job) =>
                         <tr key={job._id} className="bg-white">
                           <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                             <a href="#" className="font-bold text-blue-500 hover:underline">{job.descripition}</a>
                           </td>
                           <td className="p-3 text-md font-semibold text-gray-700 whitespace-nowrap">
                             Position : {job.position}
                             <p className='text-xs font-normal'>{job.miniDesc}</p>
                           </td>
                           <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">{job.avalablity}</td>
                           <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                           {job.status === "Active" ? ( <span
                             className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50 ">{job.status}
                           </span>):(<span
                             className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50 ">{job.status}
                           </span>)}
                           </td>
                           <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                <Link href={`/${job._id}`}>
                                    <button className='ml-1 p-1.5 text-xs font-medium uppercase tracking-wider text-blue-800 bg-blue-200 rounded-md'>View</button>
                                </Link>
                                <button className='ml-1 p-1.5 text-xs font-medium uppercase tracking-wider text-blue-800 bg-blue-200 rounded-md'>Edit</button>
                                <button   onClick={() => deletePost(job)}
                                 className='ml-1 p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-md'>Delete</button>
                           </td>
                         </tr>)}
                         
                      </tbody>
                    </table> 
                </div>
                <div className='mt-2 w-auto h-auto flex  items-start justify-between'>
                    <div className='' >Showing 1ppp to 10 of 11 entries</div>
                    <FrontPaginate postsPerPage={postsPerPage}
                        totalPosts={realtimePosts.length}
                        paginate={paginate}/>
                </div>
                
         
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
                   <div className="bg-white space-y-3 p-4 rounded-lg shadow ">
                     <div className="flex items-center space-x-2 text-sm">
                       <div>
                         <a href="#" className="text-blue-500 font-bold hover:underline">#1000</a>
                       </div>
                       <div className="text-gray-500">10/10/2021</div>
                       <div>
                         <span
                           className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">Delivered</span>
                       </div>
                     </div>
                     <div className="text-sm text-gray-700">
                       Kring New Fit office chair, mesh + PU, black
                     </div>
                     <div className="text-sm font-medium text-black">
                       $200.00
                     </div>
                   </div>

                   <div className="bg-white space-y-3 p-4 rounded-lg shadow">
                     <div className="flex items-center space-x-2 text-sm">
                       <div>
                         <a href="#" className="text-blue-500 font-bold hover:underline">#1001</a>
                       </div>
                       <div className="text-gray-500">10/10/2021</div>
                       <div>
                         <span
                           className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">Shipped</span>
                       </div>
                     </div>
                     <div className="text-sm text-gray-700">
                       Kring New Fit office chair, mesh + PU, black
                     </div>
                     <div className="text-sm font-medium text-black">
                       $200.00
                     </div>
                   </div>

                   <div className="bg-white space-y-3 p-4 rounded-lg shadow">
                     <div className="flex items-center space-x-2 text-sm">
                       <div>
                         <a href="#" className="text-blue-500 font-bold hover:underline">#1000</a>
                       </div>
                       <div className="text-gray-500">10/10/2021</div>
                       <div>
                         <span
                           className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">Cancelled</span>
                       </div>
                     </div>
                     <div className="text-sm text-gray-700">
                       Kring New Fit office chair, mesh + PU, black
                     </div>
                     <div className="text-sm font-medium text-black">
                       $200.00
                     </div>
                   </div>

                </div>
         </div>
        </div>  
    </div>
  )
}

           
          
           
export default VacancyList
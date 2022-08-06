import axios from "axios" 
import { useEffect, useState } from "react";
import { parseCookies } from "nookies"
import { toast } from "react-toastify"
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Backdrop from "./../Backdrop";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";

function StatusForm() {
  const [status_label, setStatuslabel] = useState("");
  const [status, setStatus] = useState([]);
  const [close, setClose] = useState(true)
  const [statusid, setStatusid] = useState("")

  const cookies = parseCookies()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${cookies?.token}`
          },
        }
      const response = await axios.get(
        `/api/admin/statusForm/status`,
        config
      ) 
       
       setStatus(response.data);
      } catch (error) {
        toast.error(error.response)
      }
    }
    fetchPosts();
  }, []);

  const deleteStatus = async (status) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies?.token}`
        },
      }
    const response1 = await axios.delete(
      `/api/admin/statusForm/${status._id}`,
      config
    ) 
    console.log("rrr1",response1)
    toast.success(response1.message)
    } catch (error) {
      toast.error(error.response)
    }
  };

  const uploadStatus = async (e) => {
    e.preventDefault();
    // try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies?.token}`
        },
      }

      const { data } = await axios.post(
        `/api/admin/statusForm/status`,
        { status_label },
        config
      )

      toast.success(data.message)
    // } catch (error) {
    //   toast.error(error.response)
    // }
  }

  const updateStatus = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies?.token}`
        },
      }
      const { data } = await axios.put(
        `/api/admin/statusForm/${statusid}`,
        { status_label },
        config
      )

      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }

  return (
    <div className=' '>
      {!close && <Backdrop >
                          <div className="w-72">
                            <div className=" mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-72">
                                <div className="flex justify-end">
                                 <IconButton onClick={() => setClose(true)} >
                                    <CloseRoundedIcon className="h-7 w-7 dark:text-white/75" />
                                  </IconButton>
                                </div>
                                Status
                                <div>
                                  <textarea value={status_label} onChange={(e) => setStatuslabel(e.target.value)} name="textarea" className='ml-2  outline-none px-2 w-60  rounded-md '>{status_label}</textarea>
                               </div>
                                
                                <div className='mt-3 text-end'>
                                  <button onClick={updateStatus}
                                  className='ml-1 p-1.5 text-xs font-medium uppercase tracking-wider text-blue-800 bg-blue-200 rounded-md'>Save</button>
                                  <button onClick={() => setStatuslabel("")}
                                  className='ml-1 p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-md'>Cancle</button>
                               </div>
                              </div>
                           </div>
                         </Backdrop >}
        <div className='m-5 flex items-start justify-center'>
           <div className='bg-gray-400 p-3 w-72 rounded-md '>
               <div className='mb-3 text-xl font-bold'>
                   Status Form
               </div>
               <div>
                   Status
                   <div>
                   <textarea value={status_label} onChange={(e) => setStatuslabel(e.target.value)} name="textarea" className='ml-2 border-none outline-none px-2 w-60  rounded-md '></textarea>
                   </div>
               </div>
               <div className='mt-3 text-end'>
                  <button onClick={uploadStatus}
                  className='ml-1 p-1.5 text-xs font-medium uppercase tracking-wider text-blue-800 bg-blue-200 rounded-md'>Save</button>
                  <button  onClick={() => setStatuslabel("")}
                   className='ml-1 p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-md'>Cancle</button>
               </div>
           </div>
           

           <div className="ml-6 overflow-auto rounded-lg shadow hidden md:block">
                   <table className="w-full">
                      <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">#</th>
                        <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">Status Category</th>
                        <th className="w-32 p-3 text-sm font-semibold tracking-wide text-center">Action</th>
                      </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                      {status && status.map((s) =>
                         <tr key={s._id} className="bg-white">
                           <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                             <a href="#" className="font-bold text-blue-500 hover:underline">1</a>
                           </td>
                           <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">{s.status_label}</td>
                           <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                <EditIcon onClick={() => setClose(false) & setStatuslabel(s.status_label) &  setStatusid(s._id)}  className='ml-5 mr-5 '  color="success"/>
                                {/* <button 
                                className='ml-1 p-1.5 text-xs font-medium uppercase tracking-wider text-blue-800 bg-blue-200 rounded-md'>Edit</button> */}
                                <DeleteForeverIcon onClick={() => deleteStatus(s)} lassName='ml-1 ' color="danger" />
                                {/* <button onClick={() => deleteStatus(s)}
                                className='ml-1 p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-md'>Delete</button> */}
                           </td>
                         </tr>
                      )}
                      </tbody>
                    </table> 
                </div>


        </div>
    </div>
  )
}

export default StatusForm
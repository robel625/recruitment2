import axios from "axios" 
import { useEffect, useState } from "react";
import { parseCookies } from "nookies"
import { toast } from "react-toastify"
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Backdrop from "./../Backdrop";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";



function UsersList() {
  const [status_label, setStatuslabel] = useState("");
  const [role, setRole] = useState("");
  const [user, setUser] = useState([]);
  const [close, setClose] = useState(true)
  const [userid, setUserid] = useState("")

  // const { data: session } = useSession();
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
        `/api/admin/user/user`,
        config
      ) 
    console.log(response)
      setUser(response.data);
      } catch (error) {
        toast.error(error.response)
      }
    }
    fetchPosts();
  }, []);

  const deleteUser = async (user) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies?.token}`
        },
      }
    const response1 = await axios.delete(
      `/api/admin/user/${user._id}`,
      config
    ) 
    toast.success(response1.message)
    } catch (error) {
      toast.error(error.response)
    }
  };

  // const uploadStatus = async (e) => {
  //   e.preventDefault();
  //   // try {
  //     const config = {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${cookies?.token}`
  //       },
  //     }

  //     const { data } = await axios.post(
  //       `/api/admin/statusForm/status`,
  //       { status_label },
  //       config
  //     )

  //     toast.success(data.message)
  //   // } catch (error) {
  //   //   toast.error(error.response)
  //   // }
  // }

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies?.token}`
        },
      }
      const { data } = await axios.put(
        `/api/admin/user/${userid}`,
        { role },
        config
      )

      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }

 

  return (
    <div className=''>
      {!close && <Backdrop >
                          <div className="w-72">
                            <div className=" mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-72">
                                <div className="flex justify-end">
                                 <IconButton onClick={() => setClose(true)} >
                                    <CloseRoundedIcon className="h-7 w-7 dark:text-white/75" />
                                  </IconButton>
                                </div>
                                User
                                <div>
                                  <textarea value={role} onChange={(e) => setRole(e.target.value)} name="textarea" className='ml-2  outline-none px-2 w-60  rounded-md '>{role}</textarea>
                               </div>
                                
                                <div className='mt-3 text-end'>
                                  <button onClick={updateUser}
                                  className='ml-1 p-1.5 text-xs font-medium uppercase tracking-wider text-blue-800 bg-blue-200 rounded-md'>Save</button>
                                  <button onClick={() => setRole("")}
                                  className='ml-1 p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-md'>Cancle</button>
                               </div>
                              </div>
                           </div>
                         </Backdrop >}
        <div className='m-5 '>
            <div className='flex items-start justify-between'>
               <div className=' text-2xl font-bold ' >Users</div>
               <div className=' mb-5 p-2 bg-blue-700 rounded-lg w-auto '> + New user</div>
           </div>

           <div className=" overflow-auto rounded-lg shadow hidden md:block">
                   <table className="w-full">
                      <thead className="bg-gray-50 border-b-2 border-gray-200">
                      <tr>
                        <th className="w-20 p-3 text-sm font-semibold tracking-wide text-center">#</th>
                        <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">Name</th>
                        <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">UserName</th>
                        <th className="w-24 p-3 text-sm font-semibold tracking-wide text-center">User Type</th>
                        <th className="w-32 p-3 text-sm font-semibold tracking-wide text-center">Action</th>
                      </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                      {user && user.map((u) =>
                         <tr key={u._id} className="bg-white">
                           <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                             <a href="#" className="font-bold text-blue-500 hover:underline">1</a>
                           </td>
                           <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">{u.name}</td>
                           <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">{u.email}</td>
                           <td className="p-3 text-sm text-gray-700 whitespace-nowrap text-center">{u.role}</td>
                           <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                <button onClick={() => setClose(false) & setRole(u.role)  &  setUserid(u._id)}
                                className='ml-1 p-1.5 text-xs font-medium uppercase tracking-wider text-blue-800 bg-blue-200 rounded-md'>Edit</button>
                                <button onClick={() => deleteUser(u)}
                                className='ml-1 p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-md'>Delete</button>
                           </td>
                         </tr>)}
                      </tbody>
                    </table> 
                </div>

        </div>
    </div>
  )
}

export default UsersList
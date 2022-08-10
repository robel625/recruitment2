import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import axios from "axios" 
import { toast } from "react-toastify"


import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";
import { handlePostState } from "../../atoms/postAtom";
import { parseCookies } from "nookies"

function PostJob({ handleClose }) {
    const { quill, quillRef } = useQuill();
    const [position, setPosition] = useState("");
    const [miniDesc, setMiniDesc] = useState("");
    const [status, setStatus] = useState("");
  const [avalablity, setAvalablity] = useState("");
  const [descripition, setDescription] = useState("");
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);

  const cookies = parseCookies()

  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : ""

    console.log("user", user.id)
    const userid =  user.id

   const uploadPost = async (e) => {
      e.preventDefault();
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        }
         const desc = quill.root.innerHTML
        const { data } = await axios.post(
          `/api/admin/job`,
          { position, avalablity, status, miniDesc, desc, userid },
          config
        )

        toast.success(data.message)
      } catch (error) {
        toast.error(error.response.data.error)
      }
      //const responseData = await response.json();

    setHandlePost(true);
    setModalOpen(false);
    }
    
  

  return (
    <div>
        <div className=" flex items-center justify-between border-b border-white/75 px-4 py-2.5">
            <h4 className="text-xl">New Vacancy</h4>
            <IconButton onClick={handleClose}>
              <CloseRoundedIcon className="h-7 w-7 dark:text-white/75" />
            </IconButton>
          </div>
          

          <div className="p-2  ">
            <h4>Position Name</h4>
            <input className='w-full px-3 py-1 border border-slate-600 rounded text-gray-800  '
               value={position}
               onChange={(e) => setPosition(e.target.value)}>
            </input>
            <div className="flex justify-between items-center"> 
              <div>
                <h4>Availabilty</h4>
                <input 
                    value={avalablity}
                    onChange={(e) => setAvalablity(e.target.value)}
                    placeholder=""
                    type="text"
                    className='w-52 px-3 py-1 border border-slate-600 rounded text-gray-800  '>
                    </input>
              </div>
              <div>
                <h4>Status</h4>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  type="text"
                  className="w-36  px-3 py-1 mr-20 rounded text-gray-800 ">
                  <option value="" disabled selected hidden> select status</option>  
                  <option value='Active'>Active</option>
                  <option value='Closed'>Closed</option>
                </select>
              </div>
            </div>
            <h4>mini Descripition</h4>
            <textarea className='w-full p-1  text-gray-800 rounded '
               value={miniDesc}
               onChange={(e) => setMiniDesc(e.target.value)}>
            </textarea>
            <h4>Descripition</h4>
            <div  className='bg-white'>
               <div ref={quillRef}
                 value={quill}
                 />
           </div>
           <div className="mt-20">cancle</div>
            <div>
                <button
                 className="absolute bottom-0 right-0 font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-white/75 disabled:cursor-not-allowed text-white rounded-full px-3.5 py-1"
                 type="submit"
                 onClick={uploadPost}
                 disabled={!position.trim() || !status.trim()}
                 >Post</button>
            </div>
          </div>
    </div>
  )
}

export default PostJob
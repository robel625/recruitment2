import React from 'react'
import { useRouter } from "next/router"
import axios from "axios";
import { parseCookies } from "nookies"
import { useEffect, useState } from "react";
import { toast } from "react-toastify"
import { Viewer } from '@react-pdf-viewer/core'; // install this library
// Plugins
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'; // install this library
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
// Worker
import { Worker } from '@react-pdf-viewer/core'; // install this library
import { getSession, useSession } from "next-auth/react";

export const View = () => {
    const router = useRouter()
    const cookies = parseCookies()
    const [viewPdf, setViewPdf]=useState(null);
    const [status, setStatus] = useState("");

  const { id } = router.query

  const [newStatusLists, setNewStatusLists] =useState([]);
  const [selectedOption, setSelectedOption] = useState();
  
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cookies?.token}`
    },
  }

  const fetchData = async () => {
    const response = await axios.get(
      `/api/admin/statusForm/status`,
      config
    )
    
    setNewStatusLists(response.data.map(status => ({
         label: status.status_label, 
         value: status._id})))
  }
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
    try {
        const { data } = await axios.get(
          `/api/admin/${id}`,
          config
        )
        setViewPdf(data.image)
        toast.success(data.message)
      } catch (error) {
        toast.error(error.response.data.error)
      }
    }
      
    fetchPosts();
  }, [router ]);

   const defaultLayoutPluginInstance = defaultLayoutPlugin();


   const updateStage = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cookies?.token}`
        },
      }

      const { data } = await axios.put(
        `/api/admin/${id}`,
        { selectedOption },
        config
      )

      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.error)
    }
  }
  
  
  

  return (
    <div className=''>
       <div>
                <h4>Status</h4>
                <select value={selectedOption}
                  onChange={(event) => setSelectedOption(event.target.value)}
                  className="w-36  px-3 py-1 mr-20 rounded text-gray-800 ">
                  {newStatusLists
                          .map(status => 
                         <option key={status.label} value={status.label}> 
                         {status.label}</option>)}
                 </select>
              </div>
              <button onClick={updateStage } className='ml-1 p-1.5 text-xs font-medium uppercase tracking-wider text-blue-800 bg-blue-200 rounded-md'>View</button>
             
    
      <h4>View PDF</h4>
      <div className='pdf-container'>
        {/* show pdf conditionally (if we have one)  */}
        {viewPdf&&<><Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.min.js">
          <Viewer fileUrl={viewPdf}
            plugins={[defaultLayoutPluginInstance]} />
      </Worker></>}

      {/* if we dont have pdf or viewPdf state is null */}
      {!viewPdf&&<>No pdf file selected</>}
      </div>

    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: "/src/user/login",
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}

export default View

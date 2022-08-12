import Head from 'next/head'
import Image from 'next/image'
import Front from '../components/Front'
import JobList from '../components/JobList'
import Sidebar from '../components/Sidebar'
import { getSession, signIn } from "next-auth/react";
import { connectToDatabase } from "../util/mongodb";
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home({jobs}) {
 
  return (
    <div>
      <Header/> 
       <Front/>
       <div className="flex flex-col md:flex-row gap-5 ">
          <JobList jobs={jobs}/>
          <Sidebar/>
       </div>
       <Footer/>


    </div>
    
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  const { db } = await connectToDatabase();
   const jobs = await db
     .collection("jobs")
     .find()
     .sort({ timestamp: -1 })
     .toArray();
  
  return {
    props: {
      session,
      jobs: jobs.map((job) => ({
        _id: job._id.toString(),
        position: job.position,
        availability: job.availability,
        status:job.status,
        miniDesc: job.miniDesc,
        posted: job.createdAt.toString()

      })),
    },
  };
}



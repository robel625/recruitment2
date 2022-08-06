
import ApplicationsList from '../../components/admin/ApplicationsList'
import SideNavbar from '../../components/admin/SideNavbar'
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
//import { connectToDatabase } from "../../util/mongodb";
import axios from "axios";
import { useEffect, useState } from "react";


function Applications() {

 
  

  return (
    <div>
      <div className='flex'>
           <SideNavbar/>
           <ApplicationsList/>
        </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  // if (!session) {
  //   return {
  //     redirect: {
  //       permanent: false,
  //       destination: "/src/user/login",
  //     },
  //   };
  // }

  return {
    props: {
      session,
    },
  };
}



export default Applications
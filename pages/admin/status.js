
import SideNavbar from '../../components/admin/SideNavbar'
import StatusForm from '../../components/admin/StatusForm'
import { getSession, useSession } from "next-auth/react";

function Status() {
  return (
    <div>
        <div className='flex'>
           <SideNavbar/>
           <StatusForm/>
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

export default Status
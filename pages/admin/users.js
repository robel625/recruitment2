
import SideNavbar from '../../components/admin/SideNavbar'
import TextEditor from '../../components/admin/TextEditor'
import UsersList from '../../components/admin/UsersList'
import { getSession, useSession } from "next-auth/react";

function Users() {
  return (
    <div>
        <div className='flex'>
           <SideNavbar/>
           <UsersList/>
           <TextEditor/>
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


export default Users
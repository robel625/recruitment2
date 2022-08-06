
import SideNavbar from '../../components/admin/SideNavbar'
import HomeAdmin from '../../components/admin/HomeAdmin'
import { getSession, useSession } from "next-auth/react";
import { parseCookies } from "nookies"

function Index() {
  return (
    <div>
       <div className='flex'>
           <SideNavbar/>
           <HomeAdmin/>
        </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const cookies = parseCookies(context)

  const user = cookies?.user
      ? JSON.parse(cookies.user)
      : session?.user
      ? session?.user
      : ""

      console.log("user", user)

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/src/user/login",
      },
    };
  }

  if (user.role !== "admin" ) {
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

export default Index
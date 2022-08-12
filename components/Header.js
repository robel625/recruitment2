
import Image from 'next/image'
import logo from './assets/eeuLogo.png'
import HeaderLink from './HeaderLink'
import GroupIcon from "@mui/icons-material/Group";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { Avatar } from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession  } from "next-auth/react"
import Link from 'next/link'
import { parseCookies } from "nookies"
import { useRouter } from "next/router"
import cookie from "js-cookie"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { loadUser } from "../redux/userAction"

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

function Header() {
     const { setTheme, resolvedTheme, theme } = useTheme();
     const [open,setOpen]=useState(false);
     const { data: session } = useSession()

  const cookies = parseCookies()
  const router = useRouter()
  const [userState, setUserState] = useState("")
  const [isLoggedIn, setisLoggedIn] = useState(true)

  const dispatch = useDispatch()

  const profile = useSelector((state) => state.profile)
  const { loading, error, dbUser } = profile

  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : ""
  
  useEffect(() => {
    session ? setUserState(session.user) : setUserState(user)

    if (user) {
      dispatch(loadUser(user.email, user))
    }
  }, [router, setUserState])

  const logoutHandler = async () => {
    if (session) {
      signOut()
    }
    cookie.remove("token")
    cookie.remove("user")
    setisLoggedIn(false)
    setUserState("")
  }


  return (
    <div className='bg-white  dark:bg-black shadow-md w-full fixed top-0 left-0'>
       <div className=' md:flex items-center justify-between  py-4 md:px-10 px-7'>
          <div className="flex items-center space-x-2 ">
               {/* <Image src="/../public/assets/eeuLogo.png" width={45} height={45} /> */}
               <Image src={logo} width={45} height={45} />
               <div className="font-bold text-2xl cursor-pointer  
             text-gray-800 dark:!text-white">
                 <h4>EEU</h4>
                 {/* font-[Poppins] */}
               </div>
          </div>

          <div onClick={()=>setOpen(!open)} className='absolute right-8 top-6 cursor-pointer md:hidden '>
             {open?<CloseIcon/>:<MenuIcon/>}
          </div>

          <div onClick={()=>setOpen(!open)}  className= {`md:flex md:items-center md:pb-0 pb-12 absolute md:static
               bg-white  dark:bg-black md:z-auto  z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9  transition-all
               duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}` }>
            <Link href="/">
            <a><HeaderLink Icon={HomeRoundedIcon} text="Home" feed hidden
                           active={router.pathname == "/" ? "active" : ""}/></a>
            </Link>
            <Link href="/profile">
            <a><HeaderLink Icon={BusinessCenterIcon} text="Latest Jobs" feed hidden
                            active={router.pathname == "/profile" ? "active" : ""} /></a>
            </Link>
            <HeaderLink Icon={ContactPageIcon} text="Contact" feed  hidden/>
            <div className='md:ml-8'>
            <div className={ `bg-gray-600 flex item-center  px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative 
                      ${ resolvedTheme === "dark" ? "justify-start" : "justify-end"
                 }`}
                 onClick={() =>
                   setTheme(resolvedTheme === "dark" ? "light" : "dark")
                 }>
                  <span className="absolute left-0">🌜</span>
                  <motion.div
                  className="w-5 h-5 bg-white rounded-full z-40"
                  layout
                  transition={spring}
            />
                 <span className="absolute right-0.5">🌞</span>
            </div>
            </div>
            <div className="">
              {!userState &&(
              <Link href="/src/user/login">
                <button
                  className="text-blue-700 shrink-0 font-semibold  rounded-full border border-blue-700 px-5 py-1.5
                     md:ml-8 text-xl md:my-0 my-7  transition-all hover:border-2"
                     >
                     Sign in 
                 </button>
               </Link>
              )} 

               {userState &&(
                <button
                  onClick={logoutHandler}
                  className="text-blue-700 shrink-0 font-semibold  rounded-full border border-blue-700 px-5 py-1.5
                     md:ml-8 text-xl md:my-0 my-7  transition-all hover:border-2"
                     >
                     Sign out 
                 </button>
               )}
           </div>
           
          </div>
       </div>
  </div>
  )
}
  //   <nav class=" bg-blue-500  p-5 shadow md:flex md:items-center md:justify-between">
  //     <div className='flex justify-between items-center '>
  //        <span className="text-2xl font-[Poppins] cursor-pointer">
  //          tailwind
  //        </span>
  //        <span className={`text-3xl cursor-pointer mx-2 md:hidden block`} onClick={() => setcolmenu(!colmenu)}
  //        >
  //          {colmenu ? (
  //           <div className='bg-red-500'>
  //           <HeaderLink Icon={CloseIcon } />
  //           </div>
  //           ):
  //            (<HeaderLink Icon={MenuIcon} />)}
             
              
  //           </span>
          
  //     </div>

  //     <div className= {`md:flex md:items-center z-[-1] md:z-auto md:static absolute
  //         bg-white w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7
  //         md:opacity-100 opacity-0 top-[-400px] transition-all ease-in duration-500` }>
  //            <HeaderLink Icon={ChatIcon} text="Messaging" feed />
  //            <HeaderLink Icon={NotificationsIcon} text="Notifications" feed />
  //            <HeaderLink Icon={ChatIcon} text="Messaging" feed />
  //            <HeaderLink Icon={NotificationsIcon} text="Notifications" feed />
  //     </div>

  //   </nav>
  // )
//}
      //  {/*    <header className="sticky top-0 z-40 bg-white dark:bg-[#1D2226] 
    //     flex items-center justify-around py-1.5 px-3 focus-within:shadow-lg">
    //         <div className="flex items-center space-x-2 w-full max-w-xs">
    //            <Image src="/../public/assets/eeuLogo.png" width={45} height={45} />
    //            <div className="">
    //              <h4>EEU</h4>
    //            </div>
    //         </div>
    //         <div className="flex md:flex-col items-center space-x-6">
    //           <HeaderLink Icon={HomeRoundedIcon} text="Home" feed active hidden/>
    //           <HeaderLink Icon={BusinessCenterIcon} text="Latest Jobs" feed hidden />
    //           {/* <HeaderLink Icon={PostAddIcon} text="Post a job" feed /> */}
    //           <HeaderLink Icon={ContactPageIcon} text="Contact" feed  hidden/>
    //           <div className="pl-4">
    //             <button
    //               className="text-blue-700 shrink-0 font-semibold  rounded-full border border-blue-700 px-5 py-1.5  transition-all hover:border-2"
    //                 >
    //                 Sign in 
    //             </button>
    //         </div>
              
    //           {/* <HeaderLink Icon={GroupIcon} text="My Network" feed />
    //           <HeaderLink Icon={ChatIcon} text="Messaging" feed />
    //           <HeaderLink Icon={NotificationsIcon} text="Notifications" feed />
    //           <HeaderLink Icon={Avatar} text="Me" feed avatar hidden />
    //           <HeaderLink Icon={AppsOutlinedIcon} text="Work" feed hidden /> */}
    //           <div className={`bg-gray-600 flex item-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative 
    //                 ${ resolvedTheme === "dark" ? "justify-start" : "justify-end"
    //             }`}
    //             onClick={() =>
    //               setTheme(resolvedTheme === "dark" ? "light" : "dark")
    //             }>
    //              <span className="absolute left-0">🌜</span>
    //              <motion.div
    //               className="w-5 h-5 bg-white rounded-full z-40"
    //               layout
    //               transition={spring}
    //         />
    //              <span className="absolute right-0.5">🌞</span>
    //           </div>
    //         </div>
    //     </header>
  // </div>*/}
//}

export default Header
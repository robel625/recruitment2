import  { useState } from 'react'
import Image from 'next/image'
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import WrapTextRoundedIcon from '@mui/icons-material/WrapTextRounded';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SideNavbarbtn from './SideNavbarbtn';
import Link from 'next/link';
import { useRouter } from 'next/router'

function SideNavbar() {
  const router = useRouter()
    const [open, setOpen] = useState(true);
  return (
    <div className=' '>
        <div className={` ${open ? "w-52" : "w-20"} text-black py-6 px-3  bg-white  top-0 z-20  left-0 
          peer-focus:left-0 peer:transition ease-out delay-150 duration-300 relative`}>
             <div className="absolute cursor-pointer -right-3 top-9 w-7 h-7 border-2 border-blue-200 rounded-full  ">
             <Image src="/../public/assets/control.png" width={25} height={25}
                 className={`${!open && "rotate-180"}`} onClick={() => setOpen(!open)}   />
             </div>
            <div className="flex flex-col justify-start item-center">
                
                    <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full">
                        EEU
                    </h1>
                   

                
                <div className=" my-4 border-b border-gray-100 pb-4">
                     
                    <Link href="/admin/" passHref><SideNavbarbtn Icon={HomeRoundedIcon} text="Home" open={open}
                                 active={router.pathname == "/admin" ? "active" : ""}/></Link>
                    <Link href="/admin/applications/" passHref><SideNavbarbtn Icon={PersonIcon} text="Applicants" open={open}/></Link>
                    <Link href="/admin/vacancy/" passHref><SideNavbarbtn Icon={ArticleIcon} text="Vacancy" open={open}/></Link>
                    <Link href="/admin/status/" passHref><SideNavbarbtn Icon={WrapTextRoundedIcon} text="Status Category" open={open}/></Link>
                    <Link href="/admin/users/" passHref><SideNavbarbtn Icon={PeopleIcon} text="Users" open={open}/></Link>
                    <Link href="/admin/" passHref><SideNavbarbtn Icon={SettingsIcon} text="Settings" open={open}/></Link>
                </div>
                {/* setting  */}
               <div className=" my-4 border-b border-gray-100 pb-4">
                  <SideNavbarbtn Icon={AccountCircleIcon} text="Profile" open={open}/>
                    
                  <SideNavbarbtn Icon={LogoutIcon} text="Logout" open={open}/>
             
            </div>
            </div>
        </div>
    </div>
  )
}

export default SideNavbar
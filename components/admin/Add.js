import React from 'react'
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import Backdrop from "./../Backdrop";

function Add({setClose}) {
  return (
    <Backdrop >
    <div className='h-screen w-screen  absolute top-20 z-50 flex flex-col items-center  '>
         <div className="m-16 w-96 p-7 bg-white rounded-lg opacity-1000 flex items-center justify-between border-b border-white/75 px-4 py-2.5">
            <h4 className="text-xl">New Vacancy</h4>
            <IconButton onClick={() => setClose(true)} >
              <CloseRoundedIcon className="h-7 w-7 dark:text-white/75" />
            </IconButton>
          </div>
    </div>
    </Backdrop >
  )
}

export default Add
import Link from 'next/link'
import TimeAgo from "timeago-react";

function Jobcard({ job }) {

  console.log(job.posted)
  return (
    <div className='bg-white dark:bg-[#1D2226] p-3 rounded-lg space-y-2 w-11/12 overflow-hidden border border-gray-300 dark:border-none'>
      <div className='flex items-center  justify-between'>
        <h2 className='text-xl font-bold text-orange-400'> {job.position} </h2>
        <div className='text-red-400'> posted: <TimeAgo
            datetime={ job.posted}
            className="text-xs dark:text-white/75 opacity-80"
          />
        </div>
      </div>
      <hr/>
      <div className=''>
         <div className='flex flex-col pb-3'>
             <span className=''>company: {job.company}</span>
             <span className=''>plase: {job.place}</span>
             <span className=''>level: {job.level}</span>
             <span>date: <TimeAgo
            datetime={job.date}
            className="text-xs dark:text-white/75 opacity-80"
          /></span>
             
         </div>
         <div className='px-2.5 md:break-normal'>
             <p>{job.desc}
            </p>
          </div>
      </div>
       <div className='text-sm font-bold text-orange-400 cursor-pointer'>
         <Link href={`/${job._id}`}>
          <a className=''>View job details  </a>
         </Link>
       </div>
       <hr/>
    </div>
  )
}

export default Jobcard
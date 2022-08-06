
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';

function HomeAdmin() {
  return (
    <div className=''>
      <div className='m-10  p-7 text-center bg-black rounded-lg '>
          <div className='pb-7'>  
            Welcome back Administrator!
          </div>
          <div className='grid grid-flow-col auto-cols-max gap-4'>
            <div className='p-7 w-80 flex justify-between items-center
                   bg-blue-700 rounded-lg ' >
               <div className=''>
                   New  Applicants
                   <br/>1
               </div>
               <div className=''>
                  <PersonIcon/> 
               </div>
            </div>
            <div className='p-7 w-80 flex justify-between items-center
                   bg-orange-500 rounded-lg ' >
               <div className=''>
                   Active Vacanies
                   <br/>4
               </div>
               <div className=''>
                    <SearchIcon/>
               </div>
            </div> 
          
          </div>
      </div>
  
      </div>
  )
}

export default HomeAdmin
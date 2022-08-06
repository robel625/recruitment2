import { red } from '@mui/material/colors';
import Image from 'next/image'
import renewable from "./../public/assets/renewable.jpg"
//import renewable from "./renewable.jpg"
function Front() {

    const backgroundImageStyles = {
        backgroundImage: `url(https://ethiopianembassy.org/wp-content/uploads/2021/02/New-Gerd-Info.jpg)`,
        width: "100%",
        backgroundSize: "cover",
        backgroundposition: 'center'
    };

  return (
    <div className='mt-20' style={backgroundImageStyles}>
         <div className='bg-gradient-to-r from-black'>
                {/* <Image src="/../public/assets/renewable.jpg" layout="fill" objectFit="contain"
                /> */}
                <div className='py-7 px-7 '>
                  <h1 className='text-white text-3xl font-bold items-center pb-10 pt-7 '>Ethiopian Electric Utility</h1>
                  <h2 className='text-white text-sm font-serif'>Renewable energy</h2>
                  <h1 className=' text-3xl text-green-600 font-bold'>POWERS</h1>
                  <h2 className='text-white text-sm font-serif'>our economy</h2>

                  <div className=' w-max mx-auto'>
                      <h1 className='text-white text-2xl font-bold mb-2'>Better Job. Better Talent</h1>
                      <form className='text-lg '>
                          <input className='text-white text-xl  w-80 h-12 px-7 rounded-l-full border-none outline-none bg-black' type="text" name="" placeholder="Search jobs"></input>
                          <input className='rounded-r-full text-white bg-yellow-500 hover:bg-red-500 cursor-pointer border-none outline-none h-12 w-36 ' type="submit" name="" value="Search"></input>
                      </form>
        </div>
                </div>
        </div>
    </div>
  )
}

export default Front
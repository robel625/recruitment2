import { useDeprecatedAnimatedState } from "framer-motion";
import { useStepperContext } from "../../contexts/StepperContext";
import { useSession } from "next-auth/react";
import {  useContext } from "react";
import axios from "axios" 
import { parseCookies } from "nookies"

export default function StepperControl({ handleClick, currentStep, steps }) {
  const { userData, setUserData } = useStepperContext();
  const { data: session } = useSession();

  const cookies = parseCookies()

  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : ""

  const uploadUser = async (e) => {
    e.preventDefault();
    const user_id = user._id
    const full_name = userData.fullName
    const user_email = userData.email
    const phone = userData.phone
    const gender = userData.gender
    const birthdate = userData.birthdate
    const country = userData.country
    const region = userData.region
    const city = userData.city
    const institute = userData.school
    const study = userData.study
    const degree = userData.degree
    const cgpa = userData.gpa
    const study_from = userData.from_year
    const study_to = userData.to_year
    const job_title = userData.job_title
    const job_specialization = userData.job_specialization
    const company = userData.company
    const industry = userData.industry
    const job_from = userData.job_from
    const job_to = userData.job_to

    console.log('ffull_Name ,email',user_id  )

        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        }
    
    const response = await axios.post(`/api/admin/userinfo`,
    { user_id, full_name, user_email, phone ,gender ,birthdate ,country ,region ,city , institute,
      study ,degree ,cgpa ,study_from ,study_to ,job_title ,job_specialization, 
     company ,industry ,job_from ,job_to },config);

    
    // const responseData = await response.json();
     

    handleClick("next");
  }
  
  return (
    <div className="container mt-4 mb-8 flex justify-around">
      <button
        onClick={() => handleClick()}
        className={`cursor-pointer rounded-xl border-2 border-slate-300 bg-white py-2 px-4 font-semibold uppercase text-slate-400 transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white  ${
          currentStep === 1 ? " cursor-not-allowed opacity-50 " : ""
        }`}
      >
        Back
      </button>

      {/* <button
        onClick={() => handleClick("next")}
        className="cursor-pointer rounded-lg bg-green-500 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white"
      >
        
        {currentStep === steps.length - 1 ? "Confirm" : "Next"}
      </button> */}

      {currentStep === steps.length - 1 ? (<button
         onClick={uploadUser}
         //onClick={() => handleClick("next")}
        className="cursor-pointer rounded-lg bg-green-500 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white"
         >
          Confirm
       </button>) : (<button
        onClick={() => handleClick("next")}
        className="cursor-pointer rounded-lg bg-green-500 py-2 px-4 font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-slate-700 hover:text-white"
         >
          Next
       </button>)}
    </div>
  );
}

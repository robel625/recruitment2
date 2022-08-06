import { useDeprecatedAnimatedState } from "framer-motion";
import { useStepperContext } from "../../contexts/StepperContext";
import { useSession } from "next-auth/react";
import {  useContext } from "react";

export default function StepperControl({ handleClick, currentStep, steps }) {
  const { userData, setUserData } = useStepperContext();
  const { data: session } = useSession();

  const uploadUser = async (e) => {
    e.preventDefault();
    
    const response = await fetch("/api/jobs/jobSeekers", {
      method: "POST",
      body: JSON.stringify({
        Full_Name: userData.fullName,
        user_email: userData.email,
        phone:userData.phone,
        gender:userData.gender,
        Birthdate:userData.birthdate,
        country:userData.country,
        region:userData.region,
        city:userData.city,
        school:userData.school,
        study:userData.study,
        degree:userData.degree,
        gpa:userData.gpa,
        from_year:userData.from_year,
        to_year:userData.to_year,
        job_title:userData.job_title,
        job_specialization:userData.job_specialization,
        company:userData.company,
        industry:userData.industry,
        job_from:userData.job_from,
        job_to:userData.job_to,

        sessionUsername: session.user.name,
        sessionEmail: session.user.email,
        sessionUserImg: session.user.image,
        sessionUserId: session.user.id,
        createdAt: new Date().toString(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseData = await response.json();
     

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

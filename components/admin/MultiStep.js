import { useState } from 'react'
import StepperControl from '../MulitStep/StepperControl'
import Stepper from '../MulitStep/Stepper'
import { UseContextProvider } from "../../contexts/StepperContext";

import Account from '../MulitStep/steps/Account'
import Details from '../MulitStep/steps/Details'
import Final from '../MulitStep/steps/Final'
import Payment from '../MulitStep/steps/Payment';
import Backdrop from "./../Backdrop";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import IconButton from "@mui/material/IconButton";
import RecentJob from '../MulitStep/steps/RecentJob';

function MultiStep({setClose}) {

  const [currentStep, setCurrentStep] = useState(1);
  const steps= [
  "Account Information",
  "Personal Details",
  "Payment",
  "Recent Job",
  "Complete"
  ]

   const displayStep =(step)=>{
   switch(step){
     case 1:
       return <Account />;
     case 2:
       return <Details />;
     case 3:
       return <Payment />;
     case 4:
       return <RecentJob />;
     case 5:
       return <Final />;
     default:
   }
 }

 const handleClick = (direction) => {
  let newStep = currentStep;

  direction === "next" ? newStep++ : newStep--;
  // check if steps are within bounds
  newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
 };

  return (
    <Backdrop >
    {/* <div className='mt-20'> */}
       <div className="mx-auto rounded-2xl bg-white pb-2 shadow-xl md:w-1/2">
           <div className="flex justify-end">
            <IconButton onClick={() => setClose(true)} >
               <CloseRoundedIcon className="h-7 w-7 dark:text-white/75" />
             </IconButton>
           </div>
           {/* Stepper */}
           <UseContextProvider>
           <div className="horizontal container  ">
             <Stepper steps={steps} currentStep={currentStep} />
     
             <div className="my-5 p-5 ">
               {displayStep(currentStep)}
             </div>
           </div>
     
           {/* navigation button */}
           {currentStep !== steps.length && (
             <StepperControl
               handleClick={handleClick}
               currentStep={currentStep}
               steps={steps}
             />
           )}
           </UseContextProvider>
         </div>
    {/* </div> */}
    </Backdrop >
  )
}

export default MultiStep
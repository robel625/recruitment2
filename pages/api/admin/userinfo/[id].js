import connectDB from "../../../../connectDB"
import Userinfo from "../../../../model/userinfoModel"
import { ObjectId } from "mongodb";

connectDB()

export default async (req, res) => {
    const {
        method,
        query: { id },
      } = req;
    
    if (method === "GET") {
        try {
          const userinfo2  = await Userinfo.findOne({ user_id: new ObjectId(id) });
          res.status(200).json(userinfo2);
        } catch (err) {
          res.status(404).json(err);
        }
  
      }

      if (method === "POST") {
        // const { full_name, user_email, phone ,gender ,birthdate ,country ,region ,city , institute,
        //   study ,degree ,cgpa ,study_from ,study_to ,job_title ,job_specialization, 
        //  company ,industry ,job_from ,job_to } = req.body
                
        const { full_name, user_email, phone ,gender ,birthdate ,country ,region ,city , institute,
          study ,degree ,cgpa ,study_from ,study_to ,job_title ,job_specialization, 
           company ,industry ,job_from ,job_to } = req.body

         const userinfo1  = await Userinfo.findOne({ user_id: new ObjectId(id) });
         if (!userinfo1 ) {
            const userinfo1 = await new Userinfo({
              full_name, user_email, phone ,gender ,birthdate ,country ,region ,city , institute,
              study ,degree ,cgpa ,study_from ,study_to ,job_title ,job_specialization, 
               company ,industry ,job_from ,job_to
             }).save()
       
             await userinfo1.save()
       
       
             return res.status(200).json({
               message: ` post successfull ${full_name}`,
             })
          }

          else if(userinfo1) {
            const userinfo3  = await Userinfo.findOneAndUpdate({ user_id: new ObjectId(id)}, {
              full_name, user_email, phone ,gender ,birthdate ,country ,region ,city , institute,
              study ,degree ,cgpa ,study_from ,study_to ,job_title ,job_specialization, 
               company ,industry ,job_from ,job_to
            } );

            return res.status(200).json(userinfo3);
          }
      }

}
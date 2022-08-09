import connectDB from "../../../../connectDB"
import Userinfo from "../../../../model/userinfoModel"

connectDB()

export default async (req, res) => {
//   try {
    if (req.method === "POST") {
      const { user_id, full_name, user_email, phone ,gender ,birthdate ,country ,region ,city , institute,
        study ,degree ,cgpa ,study_from ,study_to ,job_title ,job_specialization, 
       company ,industry ,job_from ,job_to } = req.body
      const userinfo1 = await new Userinfo({
        user_id, full_name, user_email, phone ,gender ,birthdate ,country ,region ,city , institute,
        study ,degree ,cgpa ,study_from ,study_to ,job_title ,job_specialization, 
       company ,industry ,job_from ,job_to
      }).save()

      await userinfo1.save()


      return res.status(200).json({
        message: ` post successfull ${full_name}`,
      })
    }

    if (req.method === "GET") {
        try {
          const userinfo2  = await Userinfo.find();
          res.status(200).json(userinfo2);
        } catch (err) {
          res.status(404).json(err);
        }
  
      }

}
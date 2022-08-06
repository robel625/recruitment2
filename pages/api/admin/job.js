import connectDB from "../../../connectDB"
import Job from "../../../model/jobModel"
import Application from "../../../model/applicationModel"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const { position, avalablity, status, miniDesc, desc, userid } = req.body
      const newJob = await new Job({
        position: position,
        avalablity: avalablity,
        status:status,
        miniDesc: miniDesc,
        discripition: desc,
        postedBy: userid,
      }).save()

      await newJob.save()


      return res.status(200).json({
        message: ` post successfull ${newJob.position}`,
      })
    }

    if (req.method === "GET") {
      try {
        const application = await Application.find();
        res.status(200).json(application);
      } catch (err) {
        res.status(404).json(err);
      }

    }
    
  } catch (error) {
    console.log(error)
  }
}



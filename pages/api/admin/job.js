import connectDB from "../../../connectDB"
import Job from "../../../model/jobModel"
import Application from "../../../model/applicationModel"

connectDB()

export default async (req, res) => {
  try {
    if (req.method === "POST") {
      const { jobid, position, company_name, status, location, availability, level, salary,
        deadline, miniDesc, descripition, postedby } = req.body
        console.log("descripitionapi, postedbyapi", descripition, postedby)
      const newJob = await new Job({
        jobid, position, company_name, status, location, availability, level, salary,
          deadline, miniDesc, descripition, postedby
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



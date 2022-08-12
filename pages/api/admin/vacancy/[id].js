import connectDB from "../../../../connectDB"
import Job from "../../../../model/jobModel"
import { ObjectId } from "mongodb";
connectDB()

export default async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  
    if (method === "PUT") {
      try {
        const { jobid, position, company_name, status, location, availability, level, salary,
            deadline, miniDesc, descripition, postedby } = req.body
      const job  = await Job.findOneAndUpdate({ _id: new ObjectId(id)}, {
        jobid, position, company_name, status, location, availability, level, salary,
          deadline, miniDesc, descripition, postedby
      } );
      console.log("job ", job )
      return res.status(200).json(job);
       } catch (err) {
       return res.status(404).json(err);
    }
  }
  

  
}



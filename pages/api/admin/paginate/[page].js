import connectDB from "../../../../connectDB"
import Job from "../../../../model/jobModel"
import Application from "../../../../model/applicationModel"
import { ObjectId } from "mongodb";
connectDB()

export default async (req, res) => {
 // console.log(req.method)
 if (req.method === "GET") {
    const { page } = req.query

    // console.log(page)

    try {
      const LIMIT = 5
      const startIndex = (Number(page) - 1) * LIMIT
      // console.log(startIndex)

      const total = await Application.countDocuments({})


      const application = await Application.find()
        .sort({ _id: 1 })
        .limit(LIMIT)
        .skip(startIndex)
        .populate('jobId')
        .populate('applicantId')


       return res.json({ data: application, count: Math.ceil(total / LIMIT) })
    } catch (error) {
      console.log(error)
    }
  }  

  
}



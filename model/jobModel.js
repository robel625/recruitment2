import mongoose from "mongoose"

const jobSchema = mongoose.Schema({
  jobid: {
    type: String,
  },
  position: {
    type: String,
  },
  company_name: {
    type: String,
  },
  status: {
    type: String,
  },
  location: {
    type: String,
  },
  availability: {
    type: String,
  },
  level: {
    type: String,
  },
  salary: {
    type: String,
  },
  deadline: {
    type: String,
  },
  miniDesc: {
    type: String,
  },
  descripition: {
    type: String,
  },
  postedby: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },

})


export default mongoose.models.Job || mongoose.model("Job", jobSchema)

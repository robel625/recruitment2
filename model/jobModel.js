import mongoose from "mongoose"

const jobSchema = mongoose.Schema({
  position: {
    type: String,
  },
  avalablity: {
    type: String,
  },
  status: {
    type: String,
  },
  miniDesc: {
    type: String,
  },
  discripition: {
    type: String,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },

})


export default mongoose.models.Job || mongoose.model("Job", jobSchema)

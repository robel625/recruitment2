import mongoose from "mongoose"

const userinfoSchema = mongoose.Schema({
  user_id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
  },
  full_name: {
    type: String,
  },
  user_email: {
    type: String,
  },
  phone:{
    type: String,
  },
  gender: {
    type: String,
  },
  birthdate:{
    type: String,
  },
  country:{
    type: String,
  },
  region:{
    type: String,
  },
  city:{
    type: String,
  },
  institute:{
    type: String,
  },
  study:{
    type: String,
  },
  degree:{
    type: String,
  },
  cgpa:{
    type: String,
  },
  study_from:{
    type: String,
  },
  study_to:{
    type: String,
  },
  job_title:{
    type: String,
  },
  job_specialization:{
    type: String,
  },
  company:{
    type: String,
  },
  industry:{
    type: String,
  },
  job_from:{
    type: String,
  },
  job_to:{
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },

})

export default mongoose.models.Userinfo || mongoose.model("Userinfo", userinfoSchema)
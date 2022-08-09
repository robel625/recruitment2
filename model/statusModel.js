import mongoose from "mongoose"

const statusSchema = mongoose.Schema({
  status_label: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },

})

export default mongoose.models.Status || mongoose.model("Status", statusSchema)
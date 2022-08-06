import mongoose from "mongoose"

const statusSchema = mongoose.Schema({
  status_label: {
    type: String,
  },

})

export default mongoose.models.Status || mongoose.model("Status", statusSchema)
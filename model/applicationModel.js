const mongoose = require('mongoose')
const Schema = mongoose.Schema

const applicationSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    applicantId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: { type: String },
    // recruiterId: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    position: {
        type: String,
      },
    name: {
        type: String,
      },
    
      email: {
        type: String,
        required: true,
      },
    stage: {
        type: String,
        default: 'New',
      },
    // status: {
    //     type: String
    // },
    // sop: {
    //     type: String
    // },
    // doj: {
    //     type: Date
    // },
    // salary: {
    //     type: Number
    // },
    // recruiterName: {
    //     type: String
    // },
    // title: {
    //     type: String
    // },
    // rating: {
    //     type: Number
    // },
    // applicantRating: {
    //     type: Number,
    //     default: -1
    // },
    createdAt: {
        type: Date,
        default: new Date(),
      },
});


export default mongoose.models.Application || mongoose.model('Application', applicationSchema)
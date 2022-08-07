import connectDB from "../../../connectDB"
import Application from "../../../model/applicationModel"

connectDB()

export default async (req, res) => {
    if (req.method === "POST") {
    
        const { position1, name1, email1, status1 } = req.body
    
    
        // try {
    
        const position = RegExp(position1, "i")
        const name = RegExp(name1 , "i")
        const email = RegExp(email1, "i")
        const stage = RegExp(status1, "i")
    
        
           const application4= await Application.find({ $and: [{position},{name},{email},{stage}] })
    
          return res.status(200).json(application4);
        // } catch (error) {
        //   console.log(error)
        // }
      }
  
}



















// // import Post from "../../../model/postModel"
// import Application from "../../../../model/applicationModel"
// import connectDB from "../../../../connectDB"
// // import { useLocation } from 'react-router-dom';
// // import queryString from 'query-string'
// connectDB()

// export default async (req, res) => {
//   // if (req.method === "GET") {
//   //   const { search: searchQuery } = req.query

//   //   const { page } = req.body

//   //   console.log("search", searchQuery, page)

//   //   const search1 =searchQuery.split(",")
//   //   console.log(search1[0], "get", search1[1],search1[2],search1[3])
//   //   if (searchQuery === "") {
//   //     return res.json()
//   //   }

//   //   try {
//   //   //   const title = RegExp(searchQuery, "i")
//   //   //   const message = RegExp(searchQuery, "i")
//   //   //   const tags = RegExp(searchQuery, "i")

//   //   const position = RegExp(search1[0], "i")
//   //   const name = RegExp(search1[1], "i")
//   //   const email = RegExp(search1[2], "i")
//   //   const stage = RegExp(search1[3], "i")

//   //     const LIMIT = 5
//   //     const startIndex = (Number(page) - 1) * LIMIT
//   //     // console.log(startIndex)

//   //     const search = await Application.find({
//   //       $and: [{position},{name},{email},{stage}]
//   //     })

//   //     const total = search.length

//   //      //const application = await Application.find({ $or: [{ stage }] }).populate('jobId').populate('applicantId')
//   //      // const application = await Application.find().populate({path: 'jobId',match: {position: {$in: "arr"}},select: 'position -_id'}).populate('applicantId')
//   //      const application = await Application.find({ $and: [{position},{name},{email},{stage}] })
//   //      .sort({ _id: 1 })
//   //      .limit(LIMIT)
//   //      .skip(startIndex)

//   //       console.log("application", JSON.stringify(application))

//   //     res.json({ data: application, count: Math.ceil(total / LIMIT) })
//   //   } catch (error) {
//   //     console.log(error)
//   //   }
//   // }
//   console.log("search11")

//   if (req.method === "POST") {
//     // const { search: searchQuery } = req.query
//     console.log("search11")

//     const { position, name, email, status } = req.body

//     console.log("search", position, name, email, status)

//     // const search1 =searchQuery.split(",")
//     // console.log(search1[0], "get", search1[1],search1[2],search1[3])
//     // if (searchQuery === "") {
//     //   return res.json()
//     // }

//     try {
//     //   const title = RegExp(searchQuery, "i")
//     //   const message = RegExp(searchQuery, "i")
//     //   const tags = RegExp(searchQuery, "i")

//     const position = RegExp(position, "i")
//     const name = RegExp(name , "i")
//     const email = RegExp(email, "i")
//     const stage = RegExp(status, "i")

//       // const LIMIT = 5
//       // const startIndex = (Number(page) - 1) * LIMIT
//       // // console.log(startIndex)

//       // const search = await Application.find({
//       //   $and: [{position},{name},{email},{stage}]
//       // })

//       // const total = search.length

//        //const application = await Application.find({ $or: [{ stage }] }).populate('jobId').populate('applicantId')
//        // const application = await Application.find().populate({path: 'jobId',match: {position: {$in: "arr"}},select: 'position -_id'}).populate('applicantId')
//        const application4= await Application.find({ $and: [{position},{name},{email},{stage}] })
//       //  .sort({ _id: 1 })
//       //  .limit(LIMIT)
//       //  .skip(startIndex)

//       return res.status(200).json({application4});

//        console.log("application", {application})

//       //res.json({ data: application, count: Math.ceil(total / LIMIT) })
//     } catch (error) {
//       console.log(error)
//     }
//   }
// }
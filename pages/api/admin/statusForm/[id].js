import connectDB from "../../../../connectDB"
import Status from "../../../../model/statusModel"
import { ObjectId } from "mongodb";

connectDB()

export default async (req, res) => {

    const {
        method,
        query: { id },
      } = req;
    if (method === "DELETE") {
        // try {
          await Status.deleteOne({ _id: new ObjectId(id) })
          return res.status(200).json({ message: "The Status has been deleted!!" });
        // } catch (error) {
        //   return res.status(500).json(error);
        // }
      }
      // try {
        if (method === "PUT") {
          const { status_label } = req.body
          console.log('sss',status_label )
          const status = await Status.findById({ _id: new ObjectId(id) })
          
          status.status_label = status_label
          
          await status.save()
              
          return res.status(200).json({ message: "success in updating status"})
        } else {
          //return res.status(401).json({ error: "Invalid credentials" })
        }
      // } catch (err) {
      //   console.log(err)
      // }

}
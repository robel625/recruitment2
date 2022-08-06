import connectDB from "../../../../connectDB"
import User from "../../../../model/userModel"
import { ObjectId } from "mongodb";

connectDB()

export default async (req, res) => {

    const {
        method,
        query: { id },
      } = req;
    if (method === "DELETE") {
        // try {
          await User.deleteOne({ _id: new ObjectId(id) })
          return res.status(200).json({ message: "The User has been deleted!!" });
        // } catch (error) {
        //   return res.status(500).json(error);
        // }
      }
      // try {
        if (method === "PUT") {
          const { role } = req.body
          console.log("roleapi",role)
          const user = await User.findById({ _id: new ObjectId(id) })
          
          user.role = role
          
          await user.save()
              
          return res.status(200).json({ message: "success in updating user"})
        } else {
          //return res.status(401).json({ error: "Invalid credentials" })
        }
      // } catch (err) {
      //   console.log(err)
      // }

}
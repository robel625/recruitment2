import connectDB from "../../../../connectDB"
import Userinfo from "../../../../model/userinfoModel"
import { ObjectId } from "mongodb";

connectDB()

export default async (req, res) => {
    const {
        method,
        query: { id },
      } = req;
    
    if (method === "GET") {
        try {
          const userinfo2  = await Userinfo.findOne({ user_id: new ObjectId(id) });
          res.status(200).json(userinfo2);
        } catch (err) {
          res.status(404).json(err);
        }
  
      }

}
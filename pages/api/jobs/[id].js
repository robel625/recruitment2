import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  const { db } = await connectToDatabase();

  if (method === "DELETE") {
    try {
      await db.collection("jobs").deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: "The post has been deleted!!" });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "PUT") {
    try {
      await db.collection("jobs").findOneAndUpdate({ _id: new ObjectId(id) },{$addToSet:req.body},{new:true},(err,res)=>{
        if(err){
          return res.status(400).json({error:'You are not authorized'})
        }});
      res.status(200).json({ message: "The post has been updated!!" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
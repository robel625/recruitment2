import { connectToDatabase } from "../../util/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;


  const { db } = await connectToDatabase();

  if (method === "GET") {
    try {
      await db.collection("jobs").find({ _id: new ObjectId(id) });
      res.status(200).json({ message: "done!!" });
    } catch (error) {
      res.status(500).json(error);
    }
  }

}
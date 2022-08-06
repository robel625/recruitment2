import { connectToDatabase } from "../../../../util/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
    param:{email}
  } = req;

  const { db } = await connectToDatabase();

  if (method === "PUT") {
    try {
      await db.collection("users").findOneAndUpdate({ email: id});
      res.status(200).json({ message: "The post has been deleted!!" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
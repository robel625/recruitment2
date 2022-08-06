import { connectToDatabase } from "../../../util/mongodb";
import { Timestamp } from "mongodb";

export default async function handler(req, res) {
  const { method, body } = req;

  const { db } = await connectToDatabase();

  if (method === "GET") {
    try {
        const posts = await db
        .collection("jobSeekers")
        .find()
        .sort({ timestamp: -1 })
        .toArray();
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === "POST") {
    try {
      const job = await db
        .collection("jobSeekers")
        .insertOne({ ...body, timestamp: new Timestamp() });
      res.status(201).json(job);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
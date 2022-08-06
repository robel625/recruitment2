import connectDB from "../../../../connectDB"
import User from "../../../../model/userModel"

connectDB()

export default async (req, res) => {
//   try {
    if (req.method === "POST") {
      const { status_label } = req.body
      const user1 = await new User({
        status_label: status_label,
      }).save()

      await status1.save()


      return res.status(200).json({
        message: ` post successfull ${status_label}`,
      })
    }

    if (req.method === "GET") {
        try {
          const user2 = await User.find();
          res.status(200).json(user2);
        } catch (err) {
          res.status(404).json(err);
        }
  
      }

}
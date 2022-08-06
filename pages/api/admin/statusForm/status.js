import connectDB from "../../../../connectDB"
import Status from "../../../../model/statusModel"

connectDB()

export default async (req, res) => {
//   try {
    if (req.method === "POST") {
      const { status_label } = req.body
      const status1 = await new Status({
        status_label: status_label,
      }).save()

      await status1.save()


      return res.status(200).json({
        message: ` post successfull ${status_label}`,
      })
    }

    if (req.method === "GET") {
        try {
          const status2 = await Status.find();
          res.status(200).json(status2);
        } catch (err) {
          res.status(404).json(err);
        }
  
      }

}
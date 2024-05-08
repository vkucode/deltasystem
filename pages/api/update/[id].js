// /pages/api/update/[id].js

import connectDB from "@/config/database";
import PostModel from "@/models/postModel";

export default async function handler(req, res) {
  const {
    query: { id },
    method,
    body,
  } = req;

  await connectDB();

  if (method === "POST") {
    try {
      const post = await PostModel.findByIdAndUpdate(id, body, {
        new: true,
        runValidators: true,
      });
      if (!post) {
        return res.status(404).json({ success: false });
      }
      res.status(200).json({ success: true, data: post });
    } catch (error) {
      res.status(400).json({ success: false, errMsg: "Update failed" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}

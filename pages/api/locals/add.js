// pages/api/locals/add.js
import connectDB from "@/config/database";
import PostModel from "@/models/postModel";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectDB();
      const newPost = new PostModel(req.body);
      await newPost.save();
      res.status(201).json({ success: true, data: newPost });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}

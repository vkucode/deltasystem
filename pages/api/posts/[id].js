// /pages/api/posts/[id].js

import connectDB from "@/config/database";
import PostModel from "@/models/postModel";

export default async function handler(req, res) {
  const {
    query: { id },
  } = req;

  await connectDB();

  try {
    const post = await PostModel.findById(id);
    if (!post) {
      return res.status(404).json({ success: false, errMsg: "Post not found" });
    }
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(400).json({ success: false, errMsg: "Error fetching post" });
  }
}

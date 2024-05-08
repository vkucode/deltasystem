import connectDB from "@/config/database";
import PostModel from "@/models/postModel";

export default async function handler(req, res) {
  const { method } = req;

  await connectDB();

  if (method === "POST") {
    try {
      // Creează o nouă postare folosind modelul Post și datele primite în corpul cererii
      const post = new PostModel(req.body);
      await post.save();
      res.status(201).json({ success: true, data: post });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    // Gestionează alte metode HTTP, dacă este necesar
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}

"use server";
import ArticleModel from "@/models/articleModel";
import connectDB from "@/config/database";

export async function getArticles() {
  try {
    await connectDB();
    const data = await ArticleModel.find().lean();

    // throw new Error("Error!");

    return { data };
  } catch (error) {
    return { errMsg: error.message };
  }
}

import { Schema, model, models } from "mongoose";

const articleSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    dataPost: {
      type: String,
      required: true,
    },
    imgThumbnail: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ArticleModel = models.articles || model("articles", articleSchema);

export default ArticleModel;

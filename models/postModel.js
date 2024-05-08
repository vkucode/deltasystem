import { Schema, model, models } from "mongoose";

const postSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    localisation: {
      type: Object,
      required: true,
    },
    details: {
      type: Object,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PostModel = models.locals || model("locals", postSchema);

export default PostModel;

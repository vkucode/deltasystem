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
    img: {
      type: String,
      required: true,
    },
    gallery: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const LocationModel = models.locals || model("location", postSchema);

export default LocationModel;

import mongoose from "mongoose";
import PostModel from "@/models/postModel";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return true;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
    return true;
  } catch (error) {
    console.log(error);
  }
};

// async function fetchLocalById(id) {
//   await connectDB(); // Ensure the database connection is established

//   try {
//     const local = await PostModel.findById(id); // Using Mongoose's findById method
//     return local;
//   } catch (error) {
//     console.error("Error fetching local by ID:", error);
//     throw error; // It's important to throw the error so the calling function knows the fetch failed
//   }
// }

export default connectDB;

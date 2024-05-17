"use server";
import LocationModel from "@/models/locationModel";
import connectDB from "@/config/database";

export async function locationPosts() {
  try {
    await connectDB();
    const data = await LocationModel.find().lean();

    // throw new Error("Error!");

    return { data };
  } catch (error) {
    return { errMsg: error.message };
  }
}

import { locationPosts } from "@/_actions/locationActions";
import { getPosts } from "@/_actions/postActions";

export const locationData = async () => {
  try {
    const { data, errMsg } = await locationPosts();
    if (!data && errMsg) {
      console.error("Error Message from Location:", errMsg);
      throw new Error(errMsg); // Throw to catch block
    }
    if (!data || data.length === 0) {
      throw new Error("No data returned from getPosts"); // Ensure data is not empty
    }

    return data.map((item) => ({
      _id: item._id,
      name: item.name,
      img: item.img,
      price: item.price,
      lat: item.localisation.lat,
      lon: item.localisation.lon,
      chambre: item.details.chambre,
      surface: item.details.surface,
    }));
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    return []; // Return an empty array and handle this in the UI
  }
};

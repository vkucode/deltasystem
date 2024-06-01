import { getPosts } from "@/_actions/postActions";

export const achatData = async () => {
  try {
    const { data, errMsg } = await getPosts();
    if (!data && errMsg) {
      console.error("Error Message from getPosts:", errMsg);
      throw new Error(errMsg); // Throw to catch block
    }
    if (!data || data.length === 0) {
      throw new Error("No data returned from getPosts"); // Ensure data is not empty
    }

    return data.map((item) => ({
      _id: item._id,
      name: item.name,
      img: item.img,
      price_dolars: item.price.dolars,
      price_aed: item.price.aed,
      category: item.category,
      lat: item.localisation.lat,
      lon: item.localisation.lon,
      chambre: item.details.chambre,
      text_content: item.text_content,
      surface: item.details.surface,
      surface_max: item.details.surface_max,
    }));
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    return []; // Return an empty array and handle this in the UI
  }
};

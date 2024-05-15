import { getArticles } from "@/_actions/articlesActions";

export const articlesData = async () => {
  try {
    const { data, errMsg } = await getArticles();
    if (!data && errMsg) {
      console.error("Error Message from getPosts:", errMsg);
      throw new Error(errMsg); // Throw to catch block
    }
    if (!data || data.length === 0) {
      throw new Error("No data returned from getPosts"); // Ensure data is not empty
    }

    return data.map((item) => ({
      _id: item._id,
      title: item.title,
      dataPost: item.dataPost,
      imgThumbnail: item.imgThumbnail,
      titleContent: item.content.article.title,
      textContent: item.content.article.text,
    }));
  } catch (error) {
    console.error("Failed to fetch data:", error.message);
    return []; // Return an empty array and handle this in the UI
  }
};

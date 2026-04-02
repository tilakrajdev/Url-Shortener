import { getShortUrl } from "../dao/shortUrl.js";
import { shortUrlWithoutUser } from "../services/shortUrl.service.js";

export const createShortUrl = async (req, res) => {
  try {
    const { url } = req.body;
    const shortUrl = await shortUrlWithoutUser(url);
    res.send(process.env.APP_URL + shortUrl);
  } catch (error) {
    console.error("Error creating short URL:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};

export const redirectFromShortUrl = async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);
  res.redirect(url.full_url);
};

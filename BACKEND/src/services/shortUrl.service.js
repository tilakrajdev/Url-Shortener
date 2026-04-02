import { generateNanoId } from "../utils/helper.js";
import urlSchema from "../models/shorturl.model.js"
import { saveShortUrl } from "../dao/shortUrl.js";

export const shortUrlWithoutUser = async (url) => {
    const shortUrl = await generateNanoId(7);
    await saveShortUrl(shortUrl, url)
    return shortUrl;
}

export const shortUrlWithUser = async (url) => {
    const shortUrl = await generateNanoId(7);
    await saveShortUrl(url, shortUrl, userId)
    return shortUrl;
}
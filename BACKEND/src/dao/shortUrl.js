import urlSchema from "../models/shorturl.model.js"

export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    const newUrl = new urlSchema({
        full_url: longUrl,
        short_url: shortUrl
    });
    if (userId) {
        newUrl.user_id = userId;
    }
    await newUrl.save();

    // const response = await fetch(
    //     `http://localhost:3000/api/short_url/${shortUrl}`,
    //     {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //             long_url: longUrl,
    //             user_id: userId,
    //         }),
    //     }
    // );
    // return response.json();
}

export const getShortUrl = async (shortUrl) => {
    return await urlSchema.findOneAndUpdate({short_url: shortUrl}, {$inc:{clicks:1}}); 
}
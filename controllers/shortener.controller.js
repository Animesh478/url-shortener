import crypto from "crypto";
import { urls } from "../schema/url_schema.js";

export const postShortener = async (req, res) => {
  const { url, shortCode } = req.body;
  // if the shortCode is not provided by the client, then we are creating a random code for the URL
  const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

  const links = await urls.find();
  console.log(links);

  // checking if the short code already exists in the DB
  if (links[finalShortCode]) {
    return res
      .status(400)
      .send("Short code already exists. Please try another one");
  }

  await urls.create({ url, shortCode: finalShortCode });
  return res.redirect("/");
};

export const getShortenerPage = async (req, res) => {
  try {
    const links = await urls.find();
    res.render("index", { links, host: req.host });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const redirectLink = async (req, res) => {
  try {
    const { shortCode } = req.params;
    console.log(shortCode);
    const link = await urls.findOne({ shortCode });
    console.log(link);

    if (!link) {
      return res.status(404).send("404 Error Occurred");
    }

    return res.redirect(link.url);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

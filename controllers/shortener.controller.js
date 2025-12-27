import crypto from "crypto";
import {
  getAllShortLinks,
  getLinkByShortCode,
  insertLink,
} from "../services/shortener.services.js";
import { urlShortCodeSchema } from "../validators/shortener-validator.js";

export const postShortener = async (req, res) => {
  const result = urlShortCodeSchema.safeParse(req.body);
 
  if (!result.success) {
    const errors = result.error.issues.map((err) => err.message);
    req.flash("errors", errors);
    return res.redirect("/");
  }
  const { url, shortCode } = result.data;
  // if the shortCode is not provided by the client, then we are creating a random code for the URL
  const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

  // checking if the short code already exists in the DB
  const shortLink = await getLinkByShortCode(finalShortCode);

  if (shortLink) {
    return res
      .status(400)
      .send(
        "<h1>Short code already exists. Please try another one. <a href='/'>Go Back</a></h1>"
      );
  }

  await insertLink({ url, finalShortCode, userId: req.user.id });
  return res.redirect("/");
};

export const getShortenerPage = async (req, res) => {
  try {
    if (!req.user) {
      return res.redirect("/login");
    }

    const links = await getAllShortLinks(req.user.id);

    res.render("index", { links, host: req.host });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const redirectLink = async (req, res) => {
  const { shortCode } = req.params;
  const link = await getLinkByShortCode(shortCode);

  if (!link) {
    return res.redirect("/404");
  }
  return res.redirect(link.url);
};

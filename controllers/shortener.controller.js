import crypto from "crypto";
import {
  getAllShortLinks,
  getLinkByShortCode,
  insertLink,
} from "../services/shortener.services.js";

export const postShortener = async (req, res) => {
  const { url, shortCode } = req.body;
  // if the shortCode is not provided by the client, then we are creating a random code for the URL
  const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

  // checking if the short code already exists in the DB
  const shortLink = await getLinkByShortCode(finalShortCode);
  console.log("short link" + shortLink);
  if (shortLink) {
    return res
      .status(400)
      .send(
        "<h1>Short code already exists. Please try another one. <a href='/'>Go Back</a></h1>"
      );
  }

  await insertLink({ url, finalShortCode });
  return res.redirect("/");
};

export const getShortenerPage = async (req, res) => {
  try {
    const links = await getAllShortLinks();
    let isLoggedIn = req.headers.cookie;
    isLoggedIn = Boolean(
      isLoggedIn
        ?.split(";")
        .find((cookie) => cookie.trim().startsWith("isLoggedIn"))
        ?.split("=")[1]
    );
    console.log(isLoggedIn);

    res.render("index", { links, host: req.host, isLoggedIn });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const redirectLink = async (req, res) => {
  const { shortCode } = req.params;
  const link = await getLinkByShortCode(shortCode);
  // console.log(link);
  if (!link) {
    return res.redirect("/404");
  }
  return res.redirect(link.url);
};

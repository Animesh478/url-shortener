import crypto from "crypto";
import path from "path";
import { readFile } from "fs/promises";
import { loadLinks, saveLinks } from "../models/shortener.model.js";

const __dirname = import.meta.dirname;

export const postShortener = async (req, res) => {
  const { url, shortCode } = req.body;
  // if the shortCode is not provided by the client, then we are creating a random code for the URL
  const finalShortCode = shortCode || crypto.randomBytes(4).toString("hex");

  const links = await loadLinks();

  // checking if the short code already exists in the DB
  if (links[finalShortCode]) {
    return res
      .status(400)
      .send("Short code already exists. Please try another one");
  }

  links[finalShortCode] = url; // adding the short code to the DB
  await saveLinks(links);
  return res.redirect("/");
};

export const getShortenerPage = async (req, res) => {
  try {
    const file = await readFile(
      path.join(__dirname, "../", "views", "index.html")
    );
    const links = await loadLinks();

    const content = file.toString().replaceAll(
      "{{shortened_urls}}",
      Object.entries(links)
        .map(([shortCode, url]) => {
          return `<li><a href="/${shortCode}" target="_blank">${
            req.host
          }/${shortCode}</a> - ${
            url.length >= 30 ? `${url.slice(0, 30)}...` : url
          }</li>`;
        })
        .join("")
    );
    return res.status(200).send(content);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
};

export const redirectLink = async (req, res) => {
  try {
    const { shortCode } = req.params;
    console.log(shortCode);
    const links = await loadLinks();
    console.log(links[shortCode]);

    if (!links[shortCode]) {
      return res.status(404).send("404 Error Occurred");
    }

    return res.redirect(links[shortCode]);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal Server Error");
  }
};

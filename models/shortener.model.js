import { readFile, writeFile } from "fs/promises";
import path from "path";

const __dirname = import.meta.dirname;

const DATA_FILE = path.join(__dirname, "../", "data", "links.json");

export const loadLinks = async function () {
  try {
    const data = await readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    if (error.code === "ENOENT") {
      await writeFile(DATA_FILE, JSON.stringify({}));
      return {};
    }
  }
};

export const saveLinks = async function (links) {
  await writeFile(DATA_FILE, JSON.stringify(links));
};

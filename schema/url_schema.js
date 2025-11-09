import mongoose from "mongoose";

const urlSchema = mongoose.Schema({
  url: { type: String, required: true },
  shortCode: { type: String, unique: true },
});

export const urls = mongoose.model("url", urlSchema);

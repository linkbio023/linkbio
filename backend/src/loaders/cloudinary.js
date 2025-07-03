import { v2 } from "cloudinary";
import config from "../config/index.js";

export default function cloudinaryConfig() {
  v2.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret,
    secure: true,
  });

  return v2;
}

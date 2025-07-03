import { MediaCountDTO, MediaDTO, MediaListDTO } from "../DTO/media.js";
import multer from "../loaders/multer.js";
import models from "../models/index.js";
import cloudinaryConfig from "../loaders/cloudinary.js";
// Create media
async function create(data, file, currentUser) {
  if (!file) {
    throw new Error("Please upload a file");
  }

  const fileData = multer.dataUri(file);

  const uploadResponse = await cloudinaryConfig().uploader.upload(fileData, {
    folder: "media",
    resource_type: "image",
    public_id: `${currentUser.id}/${Date.now()}`,
  });

  const media = await models.media.create({
    user: currentUser.id,
    type: uploadResponse.resource_type,
    url: uploadResponse.secure_url,
    publicId: uploadResponse.public_id,
    alt: data.alt,
    title: data.title,
  });

  return media;
}

// Update media
async function update(mediaData, currentUser) {
  const media = await models.media.findOne({
    where: {
      id: mediaData.id,
      userId: currentUser.id,
    },
  });

  if (!media) {
    throw new Error("Media not found");
  }

  media.url = mediaData.url;
  await media.save();
  return media;
}

// Delete media
async function remove(mediaList, currentUser) {
  const media = await models.media
    .find({
      _id: { $in: mediaList },
      user: currentUser.id,
    })
    .select({ publicId: 1 })
    .lean()
    .exec();

  if (!media) {
    throw new Error("Media not found");
  }

  const deletedMedia = await models.media
    .deleteMany({
      _id: { $in: mediaList },
      user: currentUser.id,
    })
    .lean()
    .exec();

  if (!deletedMedia) {
    throw new Error("Media not found");
  }

  const deletedMediaPublicId = media.map((media) => media.publicId);

  await cloudinaryConfig().api.delete_resources(deletedMediaPublicId);
}

// List media
async function list(currentUser) {
  const media = await models.media
    .find({
      user: currentUser.id,
    })
    .sort({ createdAt: -1 })
    .lean()
    .exec();

  const mediaList = media.map((media) => {
    return new MediaDTO()
      .setId(media._id)
      .setUrl(media.url)
      .setAlt(media.alt)
      .setTitle(media.title)
      .setPublicId(media.publicId)
      .setUserId(media.user)
      .setCreatedAt(media.createdAt)
      .setUpdatedAt(media.updatedAt)
      .build();
  });

  const mediaListDTO = new MediaListDTO().setMediaList(mediaList).build();

  return mediaListDTO;
}

// View media
async function view(mediaId, currentUser) {
  const media = await models.media.findOne({
    where: {
      id: mediaId,
      userId: currentUser.id,
    },
  });

  if (!media) {
    throw new Error("Media not found");
  }

  return media;
}

// Count Medias
// Admin can count all support tickets
// Users can only count their own support tickets
async function count(currentUser) {
  const mediaCount = await models.media.countDocuments({
    user: currentUser.id,
  });

  return new MediaCountDTO().setCount(mediaCount).build();
}

export default {
  create,
  update,
  remove,
  list,
  view,
  count,
};

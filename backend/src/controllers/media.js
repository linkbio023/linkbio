import { ResponseDTO } from "../DTO/response.js";
import services from "../services/index.js";

// Create media
async function create(req, res, next) {
  const data = req.body;
  const file = req.file;
  const currentUser = req.currentUser;

  try {
    const media = await services.media.create(data, file, currentUser);

    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(media)
      .setMessage("Media uploaded successfully")
      .build();

    res.status(201).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// Update media
async function update(req, res, next) {
  const mediaData = req.body.media;
  const currentUser = req.currentUser;

  try {
    const media = await services.media.update(mediaData, currentUser);

    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(media)
      .setMessage("Media updated successfully")
      .build();

    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// Delete media
async function remove(req, res, next) {
  const { mediaList } = req.body;
  const currentUser = req.currentUser;

  try {
    await services.media.remove(mediaList, currentUser);

    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setMessage("Media deleted successfully")
      .build();

    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// List media
async function list(req, res, next) {
  const currentUser = req.currentUser;
  try {
    const media = await services.media.list(currentUser);
    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(media)
      .setMessage("Media list")
      .build();
    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// View media
async function view(req, res, next) {
  const { mediaId } = req.params;
  const currentUser = req.currentUser;
  try {
    const media = await services.media.view(mediaId, currentUser);
    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(media)
      .setMessage("Media fetched successfully")
      .build();
    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// Count Media
async function count(req, res, next) {
  const currentUser = req.currentUser;
  try {
    const mediaCount = await services.media.count(currentUser);

    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(mediaCount)
      .setMessage("Media count fetched successfully")
      .build();
    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}
export default { create, update, remove, list, view, count };

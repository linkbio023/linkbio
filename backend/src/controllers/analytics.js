import { ResponseDTO } from "../DTO/response.js";
import services from "../services/index.js";

// Create biolink analytics and link analytics

// Create biolink analytics
// Create a new biolink analytics entry

async function createBiolinkAnalytics(req, res, next) {
  const data = req.body;
  const userAgent = req.headers["user-agent"];
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  try {
    await services.analytics.createBiolinkAnalytics(data, userAgent, ipAddress);

    const responseDTO = new ResponseDTO().setSuccess(true).build();
    res.status(204).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// Create link analytics
// Create a new link analytics entry

async function createLinkAnalytics(req, res, next) {
  const data = req.body;
  const userAgent = req.headers["user-agent"];
  const ipAddress =
    req.headers["x-forwarded-for"] || req.connection.remoteAddress;
  try {
    await services.analytics.createLinkAnalytics(data, userAgent, ipAddress);

    const responseDTO = new ResponseDTO().setSuccess(true).build();
    res.status(204).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// Get biolink analytics
// Admin can get any biolink analytics
// Users can only get their own biolink analytics

async function viewBiolinkAnalytics(req, res, next) {
  const { id } = req.params;
  const currentUser = req.currentUser;
  try {
    const biolinkAnalytics = await services.analytics.viewBiolinkAnalytics(
      id,
      currentUser
    );

    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(biolinkAnalytics)
      .setMessage("Biolink analytics retrieved successfully")
      .build();

    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// Get link analytics
// Admin can get any link analytics
// Users can only get their own link analytics

async function viewLinkAnalytics(req, res, next) {
  const { id } = req.params;
  const currentUser = req.currentUser;
  try {
    const linkAnalytics = await services.analytics.viewLinkAnalytics(
      id,
      currentUser
    );

    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(linkAnalytics)
      .setMessage("Link analytics retrieved successfully")
      .build();

    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

export default {
  createBiolinkAnalytics,
  createLinkAnalytics,
  viewBiolinkAnalytics,
  viewLinkAnalytics,
};

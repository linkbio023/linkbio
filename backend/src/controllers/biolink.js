import { BiolinkDesignDTO, BiolinkDTO } from "../DTO/biolink.js";
import { ResponseDTO } from "../DTO/response.js";
import services from "../services/index.js";
// Create, Update, Delete, List, View biolink

// Create biolink
async function create(req, res, next) {
  const { biolink } = req.body;
  const currentUser = req.currentUser;
  const bioLinkDTO = new BiolinkDTO().setUsername(biolink?.username).build();
  try {
    const biolink = await services.biolink.create(bioLinkDTO, currentUser);
    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(biolink)
      .setMessage("Biolink created successfully")
      .build();

    res.status(201).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// Update biolink
// Update biolink
async function update(req, res, next) {
  const { biolink: biolinkData, design: biolinkDesignData } = req.body;
  const currentUser = req.currentUser;

  const bioLinkDTO = new BiolinkDTO()
    .setId(biolinkData?.id)
    .setUser(biolinkData?.user)
    .setUsername(biolinkData?.username)
    .setName(biolinkData?.name)
    .setArName(biolinkData?.ar_name)
    .setArBio(biolinkData?.ar_bio)
    .setProfilePicture(biolinkData?.profilePicture)
    .setBio(biolinkData?.bio)
    .setSocialMediaLinks(biolinkData?.socialMediaLinks)
    .setLinks(biolinkData?.links)
    .setQrCode(biolinkData?.qrCode)
    .build();

  const bioLinkDesignDTO = new BiolinkDesignDTO()
    .setBackgroundDesign(biolinkDesignData?.backgroundDesign)
    .setButtonDesign(biolinkDesignData?.buttonDesign)
    .build();

  try {
    const biolink = await services.biolink.update(
      { biolink: bioLinkDTO, design: bioLinkDesignDTO },
      currentUser
    );

    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(biolink)
      .setMessage("Biolink updated successfully")
      .build();

    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}


// Delete biolink
async function remove(req, res, next) {
  const { id } = req.params;
  const currentUser = req.currentUser;
  try {
    await services.biolink.remove(id, currentUser);
    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setMessage("Biolink deleted successfully")
      .build();
    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// List of biolinks
async function list(req, res, next) {
  const { page, limit, order, beneficiary } = req.query;
  const currentUser = req.currentUser;
  try {
    const biolinks = await services.biolink.list(
      { page, limit, order, beneficiary },

      currentUser
    );
    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(biolinks)
      .setMessage("Biolinks fetched successfully")
      .build();
    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// View biolink
async function view(req, res, next) {
  const { id } = req.params;
  const currentUser = req.currentUser;

  try {
    const biolink = await services.biolink.view(id, currentUser);

    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(biolink)
      .setMessage("Biolink fetched successfully")
      .build();

    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// Public biolink view
async function publicView(req, res, next) {
  const { username } = req.params;
  try {
    const biolink = await services.biolink.publicView(username);
    console.log(biolink, 'biolink');
    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(biolink)
      .setMessage("Biolink fetched successfully")
      .build();
    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// Check availability of username
async function check(req, res, next) {
  const { username } = req.query;
  try {
    const isAvailable = await services.biolink.check(username);
    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(isAvailable)
      .setMessage("Username availability checked successfully")
      .build();
    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// Count biolinks by user
async function countByUser(req, res, next) {
  const currentUser = req.currentUser;
  try {
    const count = await services.biolink.countByUser(currentUser);
    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(count)
      .setMessage("Biolinks count fetched successfully")
      .build();
    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// Count the total number of biolinks
async function count(req, res, next) {
  try {
    const count = await services.biolink.count();
    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(count)
      .setMessage("Biolinks count fetched successfully")
      .build();
    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

// Administrators biolink view
async function administratorsView(req, res, next) {
  const { id } = req.params;
  const currentUser = req.currentUser;

  try {
    const biolink = await services.biolink.administratorsView(id, currentUser);

    const responseDTO = new ResponseDTO()
      .setSuccess(true)
      .setData(biolink)
      .setMessage("Biolink fetched successfully")
      .build();

    res.status(200).json(responseDTO);
  } catch (error) {
    next(error);
  }
}

export default {
  create,
  update,
  remove,
  list,
  view,
  publicView,
  check,
  countByUser,
  count,
  administratorsView,
};

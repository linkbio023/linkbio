import { roles } from "../constants/roles.js";
import {
  BiolinkBackgroundDesignDTO,
  BiolinkButtonDesignDTO,
  BiolinkCountDTO,
  BiolinkDesignDTO,
  BiolinkDTO,
  BiolinkListDTO,
  BiolinkUsernameAvailabilityCheckDTO,
  LinkDTO,
} from "../DTO/biolink.js";
import { MediaDTO } from "../DTO/media.js";
import { UserDTO } from "../DTO/user.js";
import models from "../models/index.js";

const FREE_USER_LINK_LIMIT = parseInt(process.env.FREE_USER_LINK_LIMIT, 10) || 30;
const MAX_USER_LINK_LIMIT = parseInt(process.env.MAX_USER_LINK_LIMIT, 10) || 40;

// Create biolink
// Create a new biolink, save its design and links
// Rollback if any error occurs
async function create(data, currentUser) {
  const { username } = data;
  const currentUserId = currentUser.id;

  const biolinkExist = await models.biolink
    .findOne({ username: username })
    .lean();

  if (biolinkExist) {
    const error = new Error("Username already exists");
    error.statusCode = 400;
    throw error;
  }

  const biolink = await models.biolink.create([
    { username: username, user: currentUserId }
  ]);

  const biolinkDesign = await models.biolinkDesign.create([
    { biolink: biolink[0]._id }
  ]);

  return { biolink, biolinkDesign };
}

// Update biolink
// Update biolink data and design
// Update Biolink and associated Links
// Update Biolink fields
// Process links array: update existing, create new, delete removed
// Remove links that are not in the updated list
// Update biolink links array with new data
// Users can only update their own biolinks
// Rollback if any error occurs

async function update(data, currentUser) {
  console.log('update:', data);
  const { id, links, name, profilePicture, bio, socialMediaLinks, ar_name, ar_bio } =
    data.biolink;

  const { backgroundDesign, buttonDesign } = data.design;
  const {
    backgroundType,
    backgroundImage,
    backgroundColor,
    backgroundGradient,
    themeTextColor,
  } = backgroundDesign;

  const {
    type,
    height,
    backgroundColor: buttonBackgroundColor,
    borderWidth,
    borderRadius,
    borderColor,
    textColor,
    shadow,
    extra,
  } = buttonDesign;

  // Enforce link/block limit
  const userPlan = currentUser.plan || 'free';
  const linkCount = links?.length || 0;
  if (userPlan === 'free' && linkCount > FREE_USER_LINK_LIMIT) {
    const error = new Error(`Free users are allowed to create up to ${FREE_USER_LINK_LIMIT} blocks.`);
    error.statusCode = 400;
    throw error;
  }
  if (linkCount > MAX_USER_LINK_LIMIT) {
    const error = new Error(`Up to ${MAX_USER_LINK_LIMIT} blocks are allowed.`);
    error.statusCode = 400;
    throw error;
  }

  const biolink = await models.biolink
    .findOne({ _id: id, user: currentUser.id })
    .lean();

  if (!biolink) {
    const error = new Error("Biolink not found");
    error.statusCode = 404;
    throw error;
  }

  if (profilePicture) {
    const profilePictureExist = await models.media
      .findOne({ _id: profilePicture, user: currentUser.id })
      .lean();
    if (!profilePictureExist) {
      const error = new Error("Profile picture not found");
      error.statusCode = 404;
      throw error;
    }
  }

  if (backgroundImage) {
    const backgroundImageExist = await models.media
      .findOne({ _id: backgroundImage, user: currentUser.id })
      .lean();
    if (!backgroundImageExist) {
      const error = new Error("Background image not found");
      error.statusCode = 404;
      throw error;
    }
  }

  // Process links array: update existing, create new, delete removed
  const updatedLinkIds = [];

  for (const link of links) {
    if (link.id) {
      // If link id is present, it is an existing link
      // Update existing link with new data
      const updatedLink = await models.link
        .findOneAndUpdate(
          { _id: link.id, biolink: id },
          {
            title: link.title,
            description: link.description,
            url: link.url,
            image: link.image,
          },
          { new: true }
        )
        .lean()
        .exec();

      // If link is not found, throw error
      if (!updatedLink) {
        console.log("updatedLink", updatedLink);
        const error = new Error("Link not found");
        error.statusCode = 404;
        throw error;
      }

      // Add updated link id to the list
      updatedLinkIds.push(updatedLink._id);
    } else {
      // If link id is not present, it is a new link
      // Create new link
      const newLink = await models.link.create([
        {
          biolink: id,
          title: link.title,
          description: link.description,
          url: link.url,
          image: link.image,
        },
      ]);
      // Add new link id to the list
      updatedLinkIds.push(newLink[0]._id);
    }
  }

  // Remove links that are not in the updated list (deleted links)
  // Because this links are deleted by the user
  const removedLinks = await models.link
    .deleteMany({ biolink: id, _id: { $nin: updatedLinkIds } })
    .lean();

  if (removedLinks.deletedCount > 0) {
    console.log("Removed links: ", removedLinks.deletedCount);
  }
  // Update biolink fields with new data
  const updatedBiolink = await models.biolink
    .findByIdAndUpdate(
      id,
      {
        links: updatedLinkIds,
        name: name,
        ar_name: ar_name,
        profilePicture: profilePicture || null,
        bio: bio,
        ar_bio: ar_bio,
        socialMediaLinks: socialMediaLinks,
        qrCode: data.biolink.qrCode || null,
      },
      { new: true }
    )
    .lean()
    .populate("profilePicture")
    .exec();

  // If biolink is not found, throw error
  if (!updatedBiolink) {
    const error = new Error("Biolink not found");
    error.statusCode = 404;
    throw error;
  }

  // Update biolink design with new data
  const biolinkDesign = await models.biolinkDesign
    .findOneAndUpdate(
      { biolink: id },
      {
        backgroundDesign: {
          backgroundType,
          backgroundImage,
          backgroundColor,
          backgroundGradient,
          themeTextColor,
        },
        buttonDesign: {
          type,
          height,
          backgroundColor: buttonBackgroundColor,
          borderWidth,
          borderRadius,
          borderColor,
          textColor,
          shadow,
          extra,
        },
      },
      { new: true }
    )
    .lean()
    .populate("backgroundDesign.backgroundImage")
    .exec();

  // If biolink design is not found, throw error
  if (!biolinkDesign) {
    const error = new Error("Biolink design not found");
    error.statusCode = 404;
    throw error;
  }

  // Create MediaDTO for background image
  const updatedBackgroundImage =
    biolinkDesign.backgroundDesign.backgroundImage;
  const backgroundImageDTO = new MediaDTO()
    .setId(updatedBackgroundImage?._id)
    .setUrl(updatedBackgroundImage?.url)
    .setPublicId(updatedBackgroundImage?.publicId)
    .setAlt(updatedBackgroundImage?.alt)
    .setTitle(updatedBackgroundImage?.title)
    .build();

  // Create Biolink Background Design DTO
  const biolinkBackgroundDesignDTO = new BiolinkBackgroundDesignDTO()
    .setBackgroundType(biolinkDesign.backgroundDesign.backgroundType)
    .setBackgroundImage(backgroundImageDTO)
    .setBackgroundColor(biolinkDesign.backgroundDesign.backgroundColor)
    .setBackgroundGradient(biolinkDesign.backgroundDesign.backgroundGradient)
    .setThemeTextColor(biolinkDesign.backgroundDesign.themeTextColor)
    .build();

  const biolinkDesignDTO = new BiolinkDesignDTO()
    .setBackgroundDesign(biolinkBackgroundDesignDTO)
    .setButtonDesign(biolinkDesign.buttonDesign)
    .build();

  // Create MediaDTO for profile picture
  const updatedProfilePicture = updatedBiolink.profilePicture;
  const profilePictureDTO = new MediaDTO()
    .setId(updatedProfilePicture?._id)
    .setUrl(updatedProfilePicture?.url)
    .setPublicId(updatedProfilePicture?.publicId)
    .setAlt(updatedProfilePicture?.alt)
    .setTitle(updatedProfilePicture?.title)
    .build();

  const updatedBiolinkDTO = new BiolinkDTO()
    .setId(updatedBiolink._id)
    .setUser(updatedBiolink.user)
    .setUsername(updatedBiolink.username)
    .setName(updatedBiolink.name)
    .setArName(updatedBiolink.ar_name)
    .setArBio(updatedBiolink.ar_bio)
    .setProfilePicture(profilePictureDTO)
    .setBio(updatedBiolink.bio)
    .setLinks(links)
    .setQrCode(updatedBiolink.qrCode)
    .build();

  return { biolink: updatedBiolinkDTO, biolinkDesign: biolinkDesignDTO };
}

// Delete biolink
// Users can only delete their own biolinks
// Rollback if any error occurs
async function remove(id, currentUser) {
  const session = await models.biolink.startSession();
  session.startTransaction();

  try {
    const biolink = await models.biolink
      .findOne({ _id: id, user: currentUser.id })
      .lean();

    if (!biolink) {
      const error = new Error("Biolink not found");
      error.statusCode = 404;
      throw error;
    }

    // Delete design
    await models.biolinkDesign
      .findOneAndDelete({ biolink: id }, { session })
      .lean();

    // Delete links
    await models.link.deleteMany({ biolink: id }, { session }).lean();

    // Delete biolink
    await models.biolink.findByIdAndDelete(id, { session }).lean();

    await session.commitTransaction();
    session.endSession();

    return true;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
}

// List biolinks
// List all biolinks
// Admin can view all biolinks
// Users can only view their own biolinks
async function list(
  { page = 1, limit = 10, order = "desc", beneficiary = "user" },
  currentUser
) {
  const skip = (page - 1) * limit;

  const query = {};

  // if beneficiary is administrator and the user is admin then he can access full list
  // otherwise he can access only his links
  if (!(beneficiary == "administrator" && currentUser.role == roles.ADMIN)) {
    query.user = currentUser.id;
  }

  const biolinks = await models.biolink
    .find(query)
    .select({ links: 0, profilePicture: 0, bio: 0 })
    .sort({ createdAt: order })
    .skip(skip)
    .limit(limit)
    .lean();

  const biolinkList = biolinks.map((biolink) => {
    return new BiolinkDTO()
      .setId(biolink._id)
      .setUser(biolink.user)
      .setUsername(biolink.username)
      .setName(biolink.name)
      .setBio(biolink.bio)
      .setArName(biolink.ar_name)
      .setArBio(biolink.ar_bio)
      .build();
  });

  const biolinkListDTO = new BiolinkListDTO().setBiolinks(biolinkList).build();

  return biolinkListDTO;
}

// View biolink
// View a biolink and its design
// Admin can view any biolink
// Users can only view their own biolinks
async function view(id, currentUser) {
  const biolink = await models.biolink
    .findOne({ _id: id, user: currentUser.id })
    .populate("links")
    .populate("profilePicture")
    .lean();
    console.log(biolink, 'biolink');

  if (!biolink) {
    const error = new Error("Biolink not found");
    error.statusCode = 404;
    throw error;
  }

  const biolinkDesign = await models.biolinkDesign
    .findOne({ biolink: id })
    .populate("backgroundDesign.backgroundImage")
    .lean();

  const linkDTO = biolink.links.map((link) => {
    return new LinkDTO()
      .setId(link._id)
      .setBiolink(link.biolink)
      .setDesign(link.design)
      .setLayout(link.layout)
      .setTitle(link.title)
      .setDescription(link.description)
      .setUrl(link.url)
      .setImage(link.image)
      .setSchedule(link.schedule)
      .setProtected(link.protected)
      .build();
  });

  const profilePictureDTO = new MediaDTO()
    .setId(biolink.profilePicture?._id)
    .setUrl(biolink.profilePicture?.url)
    .setPublicId(biolink.profilePicture?.publicId)
    .setAlt(biolink.profilePicture?.alt)
    .setTitle(biolink.profilePicture?.title)
    .build();

  const biolinkDTO = new BiolinkDTO()
    .setId(biolink._id)
    .setUser(biolink.user)
    .setUsername(biolink.username)
    .setName(biolink.name)
    .setArName(biolink.ar_name)
    .setArBio(biolink.ar_bio)
    .setProfilePicture(profilePictureDTO)
    .setBio(biolink.bio)
    .setSocialMediaLinks(biolink?.socialMediaLinks)
    .setLinks(linkDTO)
    .setCreatedAt(biolink.createdAt)
    .setUpdatedAt(biolink.updatedAt)
    .build();

  const backgroundImageDTO = new MediaDTO()
    .setId(biolinkDesign.backgroundDesign.backgroundImage?._id)
    .setUrl(biolinkDesign.backgroundDesign.backgroundImage?.url)
    .setPublicId(biolinkDesign.backgroundDesign.backgroundImage?.publicId)
    .setAlt(biolinkDesign.backgroundDesign.backgroundImage?.alt)
    .setTitle(biolinkDesign.backgroundDesign.backgroundImage?.title)
    .build();

  const backgroundDesign = biolinkDesign.backgroundDesign;
  const backgroundDesignDTO = new BiolinkBackgroundDesignDTO()
    .setBackgroundType(backgroundDesign.backgroundType)
    .setBackgroundImage(backgroundImageDTO)
    .setBackgroundColor(backgroundDesign.backgroundColor)
    .setBackgroundGradient(backgroundDesign.backgroundGradient)
    .setThemeTextColor(backgroundDesign.themeTextColor)
    .build();

  const buttonDesign = biolinkDesign.buttonDesign;
  const biolinkButtonDesignDTO = new BiolinkButtonDesignDTO()
    .setType(buttonDesign.type)
    .setHeight(buttonDesign.height)
    .setBackgroundColor(buttonDesign.backgroundColor)
    .setBorderWidth(buttonDesign.borderWidth)
    .setBorderRadius(buttonDesign.borderRadius)
    .setBorderColor(buttonDesign.borderColor)
    .setTextColor(buttonDesign.textColor)
    .setShadow(buttonDesign.shadow)
    .setExtra(buttonDesign.extra)
    .build();

  const biolinkDesignDTO = new BiolinkDesignDTO()
    .setBackgroundDesign(backgroundDesignDTO)
    .setButtonDesign(biolinkButtonDesignDTO)
    .setDimensionUnit(biolinkDesign.dimensionUnit)
    .build();

  return { biolink: biolinkDTO, biolinkDesign: biolinkDesignDTO };
}

// Public view of biolink
// Accessible by anyone
// View a biolink and its design

async function publicView(username) {
  const biolink = await models.biolink
    .findOne({ username: username })
    .populate("links")
    .populate("profilePicture")
    .lean();

  if (!biolink) {
    const error = new Error("Biolink not found");
    error.statusCode = 404;
    throw error;
  }

  const biolinkDesign = await models.biolinkDesign
    .findOne({ biolink: biolink._id })
    .populate("backgroundDesign.backgroundImage")
    .lean();

  const linkDTO = biolink.links.map((link) => {
    return new LinkDTO()
      .setId(link._id)
      .setBiolink(link.biolink)
      .setDesign(link.design)
      .setLayout(link.layout)
      .setTitle(link.title)
      .setDescription(link.description)
      .setUrl(link.url)
      .setImage(link.image)
      .setSchedule(link.schedule)
      .setProtected(link.protected)
      .build();
  });

  const profilePictureDTO = new MediaDTO()
    .setId(biolink.profilePicture?._id)
    .setUrl(biolink.profilePicture?.url)
    .setPublicId(biolink.profilePicture?.publicId)
    .setAlt(biolink.profilePicture?.alt)
    .setTitle(biolink.profilePicture?.title)
    .build();

  const biolinkDTO = new BiolinkDTO()
    .setId(biolink._id)
    .setUser(biolink.user)
    .setUsername(biolink.username)
    .setName(biolink.name)
    .setArName(biolink.ar_name)
    .setArBio(biolink.ar_bio)
    .setProfilePicture(profilePictureDTO)
    .setSocialMediaLinks(biolink?.socialMediaLinks)
    .setBio(biolink.bio)
    .setLinks(linkDTO)
    .setQrCode(biolink.qrCode)
    .build();

  const backgroundImageDTO = new MediaDTO()
    .setId(biolinkDesign.backgroundDesign.backgroundImage?._id)
    .setUrl(biolinkDesign.backgroundDesign.backgroundImage?.url)
    .setPublicId(biolinkDesign.backgroundDesign.backgroundImage?.publicId)
    .setAlt(biolinkDesign.backgroundDesign.backgroundImage?.alt)
    .setTitle(biolinkDesign.backgroundDesign.backgroundImage?.title)
    .build();

  const backgroundDesign = biolinkDesign.backgroundDesign;
  const backgroundDesignDTO = new BiolinkBackgroundDesignDTO()
    .setBackgroundType(backgroundDesign.backgroundType)
    .setBackgroundImage(backgroundImageDTO)
    .setBackgroundColor(backgroundDesign.backgroundColor)
    .setBackgroundGradient(backgroundDesign.backgroundGradient)
    .setThemeTextColor(backgroundDesign.themeTextColor)
    .build();

  const buttonDesign = biolinkDesign.buttonDesign;
  const biolinkButtonDesignDTO = new BiolinkButtonDesignDTO()
    .setType(buttonDesign.type)
    .setHeight(buttonDesign.height)
    .setBackgroundColor(buttonDesign.backgroundColor)
    .setBorderWidth(buttonDesign.borderWidth)
    .setBorderRadius(buttonDesign.borderRadius)
    .setBorderColor(buttonDesign.borderColor)
    .setTextColor(buttonDesign.textColor)
    .setShadow(buttonDesign.shadow)
    .setExtra(buttonDesign.extra)
    .build();

  const biolinkDesignDTO = new BiolinkDesignDTO()
    .setBackgroundDesign(backgroundDesignDTO)
    .setButtonDesign(biolinkButtonDesignDTO)
    .setDimensionUnit(biolinkDesign.dimensionUnit)
    .build();

  return { biolink: biolinkDTO, biolinkDesign: biolinkDesignDTO };
}

// Check availability of username
async function check(username) {
  const biolink = await models.biolink.findOne({ username: username });

  const isAvailable = new BiolinkUsernameAvailabilityCheckDTO()
    .setIsAvailable(!biolink)
    .build();

  return isAvailable;
}

// Count the number of biolinks
// 2 types of counts: total and user's biolinks
// Admin can view total biolinks
// Users can only view their own biolinks count

// Count the number of biolinks created by a user
async function countByUser(currentUser) {
  const count = await models.biolink.countDocuments({ user: currentUser.id });
  const biolinkCountDTO = new BiolinkCountDTO().setCount(count).build();
  return biolinkCountDTO;
}

// Count the total number of biolinks
async function count() {
  const count = await models.biolink.countDocuments();
  const biolinkCountDTO = new BiolinkCountDTO().setCount(count).build();
  return biolinkCountDTO;
}

// Administrators view
async function administratorsView(id, currentUser) {
  if (currentUser.role !== (roles.ADMIN || roles.MODERATOR)) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    throw error;
  }

  const biolink = await models.biolink.findById(id).populate("user").lean();

  if (!biolink) {
    const error = new Error("Biolink not found");
    error.statusCode = 404;
    throw error;
  }

  const user = biolink.user;

  const userDTO = new UserDTO()
    .setId(user._id)
    .setEmail(user.email)
    .setName(user.name)
    .setRole(user.role)
    .setCreatedAt(user.createdAt)
    .setUpdatedAt(user.updatedAt)
    .build();

  const biolinkDTO = new BiolinkDTO()
    .setId(biolink._id)
    .setUser(userDTO)
    .setUsername(biolink.username)
    .setName(biolink.name)
    .setArName(biolink.ar_name)
    .setArBio(biolink.ar_bio)
    .setBio(biolink.bio)
    .setCreatedAt(biolink.createdAt)
    .setUpdatedAt(biolink.updatedAt)
    .build();

  return biolinkDTO;
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

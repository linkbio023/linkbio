import { UserDTO } from "../DTO/user.js";
import models from "../models/index.js";

const attachCurrentUser = async (req, _res, next) => {
  try {
    const userUid = req.user.uid;

    // Atomically find or create the user
    const user = await models.user
      .findOneAndUpdate(
        { uid: userUid },
        {
          $setOnInsert: {
            name: req.user.name,
            uid: req.user.uid,
            email: req.user.email,
            role: req.user?.role || "user",
          },
        },
        {
          new: true,
          upsert: true,
          setDefaultsOnInsert: true,
        }
      )
      .lean();

    const userDTO = new UserDTO()
      .setId(user?._id)
      .setName(user?.name)
      .setUid(user?.uid)
      .setEmail(user?.email)
      .setRole(user?.role)
      .setCreatedAt(user?.createdAt)
      .setUpdatedAt(user?.updatedAt)
      .build();

    req.currentUser = userDTO;

    next();
  } catch (err) {
    next(err);
  }
};

export default attachCurrentUser;

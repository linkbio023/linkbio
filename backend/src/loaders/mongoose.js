import { connect } from "mongoose";
import config from "../config/index.js";

export default async () => {
  const connection = await connect(config.databaseURL, { autoIndex: false });

  return connection.connection.db;
};

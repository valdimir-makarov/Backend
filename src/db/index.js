import mongoose from "mongoose";

import { BUBUN } from "../constants.js";

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${BUBUN}`,
    );
    console.log(`MOnggoDB connected ${connectionInstance.connection.host}`);
    
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;

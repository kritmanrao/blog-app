import mongoose from "mongoose";

export async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected" + conn.connection.host);
  } catch (e) {
    console.log("error in connection to MongoDB " + e);
    process.exit(1); // failure
  }
}

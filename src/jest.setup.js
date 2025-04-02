import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

beforeAll(async () => {
  const url = process.env.MONGODB_URI || "mongodb://localhost:27017/test";
  await mongoose.connect(url);
});

afterAll(async () => {
  await mongoose.connection.close();
});

import mongoose from "mongoose";

const DbConnect = async () => {
  mongoose.set('strictQuery', false);
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/happy`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default DbConnect 

import mongoose from "mongoose";

const DbConnect = async (req, res, next) => {
  try {
    await mongoose.connect(
      "mongodb+srv://happy2004:2004%40happy@cluster0.twa8tfa.mongodb.net",
      {
        dbName: "ecommerceDatabase",
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Connected to MongoDB");
    next();
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    next(error);
  }
};

export default DbConnect;

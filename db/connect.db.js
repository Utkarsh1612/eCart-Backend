const mongoose = require("mongoose");
require("dotenv").config();

const MONGOUri = process.env.MONGODB;

const initialiseDatabase = async () => {
  await mongoose
    .connect(MONGOUri)
    .then(() => console.log("connected to database"))
    .catch((error) => console.log("Error in connecting to database"));
};

module.exports = initialiseDatabase;

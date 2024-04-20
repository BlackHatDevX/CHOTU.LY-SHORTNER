require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

const urlSchema = mongoose.Schema({
  fullUrl: String,
  shortnUrl: String,
  shortnTime: String,
  shortnDate: String,
});

module.exports = mongoose.model("urlDB", urlSchema);

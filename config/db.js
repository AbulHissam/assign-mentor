const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB_URI);
    if (conn) {
      console.log("Connected to", conn.connection.host);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = connectToDB;

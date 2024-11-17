
const mongoose = require("mongoose");
const ConnectDb = async () => {
    try {
      const conn = await mongoose.connect("mongodb://127.0.0.1/chat-app", {
      
      });
      console.log(`Db is connected`);
    } catch (err) {
      console.log(err);
    }
  };
  

module.exports = ConnectDb

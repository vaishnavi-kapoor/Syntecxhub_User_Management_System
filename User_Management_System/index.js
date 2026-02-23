import mongoose from "mongoose";
import express from "express";

mongoose
  .connect("mongodb://127.0.0.1:27017/user_management_system")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const app = express();

// for user routes
const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
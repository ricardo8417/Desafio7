import mongoose from "mongoose";

const UserModel = mongoose.model("users",new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    rol: {
      type: String,
      enum: ["usuario", "admin"],
      default: "usuario",
    }
  })
);
mongoose.set("strictQuery", false);

export default UserModel
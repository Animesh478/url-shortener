import mongoose from "mongoose";

try {
  await mongoose.connect("mongodb://localhost:27017/mongoose_middleware");
  mongoose.set("debug", true);
} catch (error) {
  console.error(error);
}

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
});

// middleware
userSchema.pre(["updateOne", "updateMany"], function (next) {
  this.set({ updatedAt: Date.now() });
  next();
});

const User = mongoose.model("user", userSchema);

// const user = new User({
//   name: "Jon Doe",
//   email: "jon@test.com",
//   age: 20,
// });

// await user.save();

await User.updateOne({ email: "jon@test.com" }, { $set: { age: 25 } });

await mongoose.connection.close();

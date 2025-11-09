import mongoose from "mongoose";

try {
  await mongoose.connect("mongodb://localhost:27017/mongoose_test");
  mongoose.set("debug", true);
} catch (error) {
  console.error(error);
}

// create schema
const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true, min: 5 },
  createdAt: { type: Date, default: Date.now() },
});

// creating model : it is used to create documents
const User = mongoose.model("User", userSchema);

const user = new User({
  name: "Animesh",
  email: "animesh@test.com",
  age: 30,
});

await user.save();

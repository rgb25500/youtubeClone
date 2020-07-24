import mongoose from "mongoose";
import path from "path";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    ref: "User",
  },
  avatarUrl: {
    type: String,
    ref: "User",
  },
});

// var profileSchema = new mongoose.Schema({
//   name: String,
//   address: addressSchema,
//   birthday: Date,
//   meta: mongoose.Schema.Types.Mixed,
//   image: {
//     data: Buffer,
//     contentsType: String,
//   },
//   recommend: [String],
// });

const model = mongoose.model("Comment", CommentSchema);
export default model;

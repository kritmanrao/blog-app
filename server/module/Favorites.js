import mongoose from "mongoose";

const favoritesSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // one favorites list per user
    },
    favorites: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

const Favorites = mongoose.model("Favorites", favoritesSchema);
export default Favorites;

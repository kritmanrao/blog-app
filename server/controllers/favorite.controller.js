import Favorites from "../module/Favorites";

export async function getFavoritePost(req, res) {
  try {
    const userId = req.user._id;
    const favoritesPosts = await Favorites.findOne({ user: userId });
    res.status(200).json({
      success: true,
      favoritesPosts,
    });
  } catch (error) {
    console.error("Error in Feaching favorite posts:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function toggleFavorite(req, res) {
  try {
    const userId = req.user._id;
    const { postId } = req.params;

    const favorites = await Favorites.findOne({ user: userId });

    let updated;

    if (favorites?.favorites.includes(postId)) {
      updated = await Favorites.findOneAndUpdate(
        { user: userId },
        { $pull: { favorites: postId } },
        { new: true }
      );
    } else {
      updated = await Favorites.findOneAndUpdate(
        { user: userId },
        { $addToSet: { favorites: postId } },
        { new: true, upsert: true }
      );
    }

    res.status(200).json({
      success: true,
      favorites: updated.favorites,
    });
  } catch (error) {
    console.error("Error toggling favorite:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

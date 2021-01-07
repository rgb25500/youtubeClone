import routes from "../routes";
import Video from "../models/Video";
import User from "../models/User";
import Comment from "../models/Comment";

export const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
    user,
  } = req;

  try {
    const video = await Video.findById(id)
      .populate({
        path: "comments",
        populate: { path: "creator", model: User },
      })
      .populate("creator");
    // console.log(video);
    const newComment = await Comment.create({
      text: comment,
      creator: user.id,
      name: user.name,
      avatarUrl: user.avatarUrl,
    });
    video.comments.push(newComment.id);
    // const newCommentId = newComment.id;
    video.save();
    res.status(200).set("Content-Type", "text/html").json(newComment);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const editComment = async (req, res) => {
  const {
    body: { originalText, editText },
  } = req;
  try {
    const comment = await Comment.findOneAndUpdate(
      { text: originalText },
      { $set: { text: editText } },
      { new: true },
      (err, doc) => {
        if (err) {
          console.log(err);
        }
        console.log(doc);
      }
    );
    console.log(comment);
  } catch (error) {
    req.flash("error", "Can't edit comment");
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  const {
    body: { originalText },
  } = req;
  try {
    await Comment.findOneAndDelete({ text: originalText });
  } catch (error) {
    console.log(error);
  }
};

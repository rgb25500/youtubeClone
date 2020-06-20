import routes from "../routes";
import Video from "../models/Video";

export const home = async (req, res) => {
  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    res.render("home", { pageTitle: "HOME", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "HOME", videos: [] });
  }
  // throw Error("lalala");
};

export const search = async (req, res) => {
  // console.log(req.query.term);
  // const searchingBy = req.qeury.term;
  const {
    query: { term: searchingBy },
  } = req;
  let videos = [];
  try {
    videos = await Video.find({
      title: { $regex: searchingBy, $options: "i" },
    });
  } catch (error) {
    console.log(error);
  }
  res.render("search", { pageTitle: "SEARCH", searchingBy, videos });
};
// 제목과 설명 동시에 찾을 때
// $or: [
//   { title: { $regex: searchingGBy, $options: "i" } },
//   { description: { $regex: searchingBy, $options: "i" } },
// ],

// UPLOAD
export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "UPLOAD" });
};
export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id,
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

export const videoDetail = async (req, res) => {
  // console.log(req.params);
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findOneAndUpdate(
      { _id: id },
      { title, description }
    );
    res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = (req, res) => {};

export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    await Video.findOneAndRemove({ _id: id });
  } catch (error) {
    res.redirect(routes.home);
  }
};

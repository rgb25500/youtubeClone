import routes from "../routes";
import Video from "../models/Video";
import { s3 } from "../middlewares";

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
    file: { location },
  } = req;
  // console.log(req.file);
  const newVideo = await Video.create({
    fileUrl: location,
    title,
    description,
    creator: req.user.id,
  });
  console.log(newVideo);
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

// Video Detail
export const videoDetail = async (req, res) => {
  // console.log(req.params);
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id)
      .populate("creator")
      .populate("comments");
    // 댓글에 avatarUrl 가져오기.
    if (video.commments) {
      res.render("videoDetail", { pageTitle: video.title, video });
    } else {
      res.render("videoDetail", {
        pageTitle: video.title,
        video,
      });
    }
  } catch (error) {
    console.log(error);
    res.redirect(routes.home);
  }
};

// Edit Video
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      // console.log("타입비교", typeof video.creator, typeof req.user.id);  => 객체, 문자열
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  try {
    const video = await Video.findByIdAndUpdate(
      { _id: id },
      { title, description }
    );
    //$set: { text: editText }
    res.redirect(routes.videoDetail(video.id));
  } catch (error) {
    req.flash("error", "Can't edit video");
    res.redirect(routes.home);
  }
};

// Delete Video
export const deleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    if (String(video.creator) !== req.user.id) {
      throw Error();
    } else {
      // 1. file delete on local storage
      // await Video.findOneAndRemove({ _id: id });

      // 2. file delete on aws s3
      const tmpArray = video.fileUrl.split("/");
      console.log(tmpArray);
      // [
      //   'https:',
      //   '',
      //   'youtubeclonebucket.s3.ap-northeast-2.amazonaws.com',
      //   'video',
      //   '5ef0c58ab5449766323d76500f4f6049'
      // ]
      const fileName = tmpArray[tmpArray.length - 1];
      const params = {
        Bucket: "youtubeclonebucket/video",
        Key: fileName,
      };
      s3.deleteObject(params, (err, data) => {
        if (err) {
          console.log("video delete error");
          console.log(err, err.stack);
        } else {
          console.log("video delete success!!");
          console.log(data);
        }
      });
      await video.remove();
      res.redirect(routes.home);
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

// Register Video View
export const postRegisterView = async (req, res) => {
  // 비디오를 먼저 찾고 (async)
  // 조회수를 증가하는 기능
  const {
    params: { id },
  } = req;
  try {
    const video = await Video.findById(id);
    video.views += 1;
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

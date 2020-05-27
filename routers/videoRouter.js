import express from "express";
import routes from "../routes";
import {
  videoDetail,
  editVideo,
  deleteVideo,
  getUpload,
  postUpload,
} from "../controllers/videoController";

const videoRouter = express.Router();

// UPLOAD VIDEO
videoRouter.get(routes.upload, getUpload);
videoRouter.post(routes.upload, postUpload);

videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;

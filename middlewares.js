import multer from "multer";
import routes from "./routes";

// 파일이 저장될 위치
const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = {
    isAuthenticated: true,
    id: 1,
  };
  next();
};

// req.file 은 `videoFile` 라는 필드의 파일 정보.
export const uploadVideo = multerVideo.single("videoFile");

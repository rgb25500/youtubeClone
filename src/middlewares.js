import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import AmazonS3URI from "amazon-s3-uri";
import routes from "./routes";

// 초기화된 S3
export const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-2",
});

// 자격 증명
// aws.config.getCredentials((err) => {
//   if (err) console.log(err.stack);
//   else {
//     console.log(("Access key:", aws.config.credentials.accessKeyId));
//   }
// });

// 파일이 저장될 위치 ( AWS 이용 전 테스트 )
// const multerVideo = multer({ dest: "uploads/videos/" });
// const multerAvatar = multer({ dest: "uploads/avatars/" });

// AWS 를 이용한 파일 업로드
const multerVideo = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "youtubeclonebucket/video",
  }),
});

const multerAvatar = multer({
  storage: multerS3({
    s3,
    acl: "public-read",
    bucket: "youtubeclonebucket/avatar",
  }),
});

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  // console.log(req.user);
  next();
};

// 로그아웃 상태에서만 접근을 허용하는 미들웨어.
export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

// req.file 은 `videoFile` 라는 필드의 파일 정보.
export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

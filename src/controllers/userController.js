import passport from "passport";
import routes from "../routes";
import User from "../models/User";

// const AmazonS3URI = require('amazon-s3-uri')

// try {
//      const uri = 'https://bucket.s3-aws-region.amazonaws.com/key'
//      const { region, bucket, key } = AmazonS3URI(uri)
// } catch((err) => {
//      console.warn(`${uri} is not a valid S3 uri`) // should not happen because `uri` is valid in that example
// })

// JOIN
export const getJoin = (req, res) => res.render("join", { pageTitle: "JOIN" });

export const postJoin = async (req, res, next) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "JOIN" });
  } else {
    try {
      // user를 만들어서 등록시킴.
      const user = await User({ name, email });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

// LOG IN
export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "LOGIN" });
};

export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

// Github
export const githubLogin = passport.authenticate("github");

export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

// Google
export const googleLogin = passport.authenticate("google", {
  scope: [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ],
});

export const googleLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { sub, picture, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.googleId = sub;
      user.save();
      return cb(null, user);
    }
    const newUser = await User.create({
      email,
      name,
      googleId: sub,
      avatarUrl: picture,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGoogleLogIn = (req, res) => {
  res.redirect(routes.home);
};

// Kakao
export const kakaoLogin = passport.authenticate("kakao");

export const kakaoLoginCallback = async (_, __, profile, done) => {
  const {
    _json: {
      id,
      properties: { nickname, profile_image: avatarUrl },
      kakao_account: { email },
    },
  } = profile;
  try {
    const user = await User.findOne({ email });
    if (user) {
      user.kakaoId = id;
      user.save();
      return done(null, user);
    }
    const newUser = await User.create({
      email,
      name: nickname,
      kakaoId: id,
      avatarUrl,
    });
    return done(null, newUser);
  } catch (error) {
    return done(error);
  }
};

export const postKakaoLogIn = (req, res) => {
  res.redirect(routes.home);
};

// LOG OUT
export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

// var s3 = new AWS.S3({apiVersion: '2006-03-01'});
// var params = {Bucket: 'myBucket', Key: 'myImageFile.jpg'};
// var file = require('fs').createWriteStream('/path/to/file.jpg');
// s3.getObject(params).createReadStream().pipe(file);

export const getMe = async (req, res) => {
  // AWS 에서 디폴트유저 이미지 가져오려는 삽질..
  // const params = { Bucket: "youtubeclonebucket/avatar", Key: "user.png" };
  // const test = __dirname; // C:\Users\김인영\Documents\youtubeClone\controllers
  // const directory = path.join(__dirname, ".."); // C:\Users\김인영\Documents\youtubeClone
  // const image = "/image/file.png";
  // const imagePath = path.join(directory, image);
  // const file = fs.createWriteStream(imagePath);
  // const defaultAvatar = s3.getObject(params).createReadStream().pipe(file);
  // 방금 로그인한 사용자를 전달.
  try {
    const user = await User.findById(req.user.id).populate("videos");
    res.render("userDetail", { pageTitle: "USER DETAIL", user });
    console.log(user);
  } catch (error) {
    res.redierct(routes.home);
  }
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    console.log(user);
    res.render("userDetail", { pageTitle: "USER DETAIL", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) =>
  res.render("editProfile", { pageTitle: "EDIT PROFILE" });

export const postEditProfile = async (req, res) => {
  // console.log(req);
  const {
    body: { name, email },
    file,
  } = req;
  console.log(req.body, req.file);
  try {
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.location : req.user.avatarUrl,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) =>
  res.render("changePassword", { pageTitle: "CHANGE PASSWORD" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.status(400);
    res.redirect(`/users${routes.changePassword}`);
  }
};

import passport from "passport";
import GitHubStrategy from "passport-github";
import GoogleStrategy from "passport-google-oauth20";
import KakaoStrategy from "passport-kakao";
import User from "./models/User";
import {
  githubLoginCallback,
  googleLoginCallback,
  kakaoLoginCallback,
} from "./controllers/userController";
import routes from "./routes";

passport.use(User.createStrategy());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `https://sheltered-spire-39535.herokuapp.com${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: `https://sheltered-spire-39535.herokuapp.com${routes.googleCallback}`,
    },
    googleLoginCallback
  )
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      clientSecret: "",
      callbackURL: `https://sheltered-spire-39535.herokuapp.com/${routes.kakaoCallback}`,
    },
    kakaoLoginCallback
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

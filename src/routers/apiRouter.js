import express from "express";
import routes from "../routes";
import { postRegisterView } from "../controllers/videoController";
import {
  postAddComment,
  deleteComment,
  editComment,
} from "../controllers/commentController";

const apiRouter = express.Router();

// READ
apiRouter.post(routes.registerView, postRegisterView);

// CREATE
apiRouter.post(routes.addComment, postAddComment);

// UPDATE
apiRouter.post(routes.editComment, editComment);

// DELETE
apiRouter.post(routes.deleteComment, deleteComment);

export default apiRouter;

import routes from "../routes";

export const home = (req, res) =>
  res.render("home", { pageTitle: "HOME", videos });
export const search = (req, res) => {
  // console.log(req.query.term);
  // const searchingBy = req.qeury.term;
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", { pageTitle: "SEARCH", searchingBy, videos });
};

// UPLOAD
export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "UPLOAD" });
};
export const postUpload = (req, res) => {
  const {
    body: { file, title, description },
  } = req;
  res.redirect(routes.videoDetail(12345));
};
export const videoDetail = (req, res) => res.render("videoDetail");
export const editVideo = (req, res) => res.render("editVideo");
export const deleteVideo = (req, res) => res.render("deleteVideo");

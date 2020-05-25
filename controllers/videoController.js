export const home = (req, res) => res.render("home", { pageTitle: "home" });
export const search = (req, res) => {
  // console.log(req.query.term);
  // const searchingBy = req.qeury.term;
  const {
    query: { term: searchingBy },
  } = req;
  res.render("search", { pageTitle: search, searchingBy });
};
export const upload = (req, res) => res.render("upload");
export const videoDetail = (req, res) => res.render("videoDetail");
export const editVideo = (req, res) => res.render("editVideo");
export const deleteVideo = (req, res) => res.render("deleteVideo");

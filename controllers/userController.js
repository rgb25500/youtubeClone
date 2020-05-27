import routes from "../routes";

// JOIN
export const getJoin = (req, res) => res.render("join", { pageTitle: "JOIN" });
export const postJoin = (req, res) => {
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    res.status(400);
    res.render("join", { pageTitle: "JOIN" });
  } else {
    res.redirect(routes.home);
  }
};

// LOG IN
export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "LOGIN" });
};
export const postLogin = (req, res) => {
  res.redirect(routes.home);
};

// LOG OUT
export const logout = (req, res) => {
  res.redirect(routes.home);
};
export const userDetail = (req, res) => res.render("userDetail");
export const editProfile = (req, res) => res.render("editProfile");
export const changePassword = (req, res) => res.render("changePassword");

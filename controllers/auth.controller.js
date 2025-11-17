export const getRegisterPage = function (req, res) {
  res.render("auth/register");
};
export const getLoginPage = function (req, res) {
  res.render("auth/login");
};
export const postLogin = function (req, res) {
  res.setHeader("Set-Cookie", "isLoggedIn=true; path=/;");
  res.redirect("/");
};

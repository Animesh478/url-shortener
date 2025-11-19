import { getUserByEmail, createUser } from "../services/auth.services.js";

export const getRegisterPage = function (req, res) {
  res.render("auth/register");
};

//? get the data from the client and create a new user in the db
export const postRegister = async function (req, res) {
  const { name, email, password } = req.body;

  // check if anyone with the same email already exists or not
  const existingUser = await getUserByEmail(email);

  // if a user with that email exists, then that user has to register again with another email
  if (existingUser) {
    return res.redirect("/register");
  }

  // if the user doesnot exist, then insert the user details in the db
  const [newUser] = await createUser({ name, email, password });

  res.redirect("/login");
};

export const getLoginPage = function (req, res) {
  res.render("auth/login");
};
export const postLogin = function (req, res) {
  res.cookie("isLoggedIn", true);
  res.redirect("/");
};

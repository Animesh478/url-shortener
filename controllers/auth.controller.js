import {
  getUserByEmail,
  createUser,
  hashPassword,
  comparePassword,
  generateToken,
} from "../services/auth.services.js";

export const getRegisterPage = function (req, res) {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("auth/register", { error: req.flash("error") });
};

//? get the data from the client and create a new user in the db
export const postRegister = async function (req, res) {
  if (req.user) {
    return res.redirect("/");
  }

  const { name, email, password } = req.body;

  // check if anyone with the same email already exists or not
  const existingUser = await getUserByEmail(email);

  // if a user with that email exists, then that user has to register again with another email
  if (existingUser) {
    req.flash("error", "User already exists");
    return res.redirect("/register");
  }

  // if the user doesnot exist, then insert the user details in the db
  // hash the password
  const hashedPassword = await hashPassword(password);
  const [newUser] = await createUser({ name, email, password: hashedPassword });

  res.redirect("/login");
};

export const getLoginPage = function (req, res) {
  if (req.user) {
    return res.redirect("/");
  }
  res.render("auth/login", { error: req.flash("error") });
};

export const postLogin = async function (req, res) {
  if (req.user) {
    return res.redirect("/");
  }
  const { email, password } = req.body;
  // check if anyone with the same email already exists or not
  const user = await getUserByEmail(email);

  // if a user with that email does not exists, then that user has to login again with the correct email
  if (!user) {
    req.flash("error", "Invalid email or password");
    return res.redirect("/login");
  }

  // if the password entered by the user doesnot match with the one in the db, then also the user has to login again with correct credentials
  const validPassword = await comparePassword(password, user.password);
  if (!validPassword) {
    req.flash("error", "Invalid email or password");
    return res.redirect("/login");
  }

  const token = generateToken({
    id: user.id,
    email: user.email,
    name: user.name,
  });

  res.cookie("access_token", token);
  res.redirect("/");
};

export const getMe = function (req, res) {
  if (!req.user) {
    return res.send("Not logged in");
  }
  return res.send(`<h1> Welcome, ${req.user.name}`);
};

export const logoutUser = function (req, res) {
  res.clearCookie("access_token");
  res.redirect("/login");
};

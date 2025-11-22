import {
  getUserByEmail,
  createUser,
  hashPassword,
  comparePassword,
  generateToken,
} from "../services/auth.services.js";

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
  // hash the password
  const hashedPassword = await hashPassword(password);
  const [newUser] = await createUser({ name, email, password: hashedPassword });

  res.redirect("/login");
};

export const getLoginPage = function (req, res) {
  res.render("auth/login");
};
export const postLogin = async function (req, res) {
  const { email, password } = req.body;
  // check if anyone with the same email already exists or not
  const user = await getUserByEmail(email);

  // if a user with that email does not exists, then that user has to login again with the correct email
  if (!user) {
    return res.redirect("/login");
  }

  // if the password entered by the user doesnot match with the one in the db, then also the user has to login again with correct credentials
  const validPassword = await comparePassword(password, user.password);
  if (!validPassword) {
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

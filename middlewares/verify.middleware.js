import { verifyJWTToken } from "../services/auth.services.js";

export const verifyAuthentication = function (req, res, next) {
  const token = req.cookies.access_token;
  if (!token) {
    req.user = null;
    return next();
  }
  try {
    const decoded = verifyJWTToken(token);
    req.user = decoded;
  } catch (error) {
    req.user = null;
  }
  return next();
};

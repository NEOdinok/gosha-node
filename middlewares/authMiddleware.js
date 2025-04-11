import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) return res.redirect("/login");

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      return res.redirect("/login");
    }
    console.log(decodedToken);
    next();
  });
};

export const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    res.locals.user = null;
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
    if (err) {
      console.log(err.message);
      res.locals.user = null;
      return next();
    }

    console.log(decodedToken);
    let user = await User.findById(decodedToken.id);
    res.locals.user = user;
    next();
  });
};

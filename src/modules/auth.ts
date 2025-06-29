import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'


export const comparePasswords = (password,hash) => {return bcrypt.compare(password,hash)}
export const hashPassword = (password) => {return bcrypt.hash(password , 5)}
export const createJWT = (user) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    "goat"
  );
  return token;
};

export const protect = (req, res, next) => {
  const bearer = req.headers.authorization;
console.log("Authorization header:", req.headers.authorization);

  if (!bearer) {
    res.status(401);
    res.send("Not authorized bearer");
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    console.log("here");
    res.status(401);
    res.send("Not authorized token");
    return;
  }

  try {
    const payload = jwt.verify(token, "goat");
    req.user = payload;
    console.log(payload);
    next();
    return;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.send("Not authorized3");
    return;
  }
};
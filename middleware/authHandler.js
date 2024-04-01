const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const authHandler = asyncHandler(async (req, res, next) => {
  let token;
  let authToken = req.headers.authorization || req.headers.Authorization;
  if (authToken ?? authToken.startsWith("Bearer")) {
    token = authToken.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        res.json("Unauthorized user");
      }
      console.log("decoded", decoded);
      req.user = decoded.user;
      next();
    });

    if(!token){
        res.status(401);
        res.json("Unauthorized user");
    }
  }
});

module.exports = authHandler;

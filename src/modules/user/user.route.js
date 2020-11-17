const {Router} = require("express");

const checkEmailExistMiddleware = require("./middlewares/checkEmailExistMiddleware");
const registerUserValidateMiddleware = require("./middlewares/registerUserValidateMiddleware");
const loginUserValidateMiddleware = require("./middlewares/loginUserValidateMiddleware");

const userController = require("./user.controller");

const userRouter = Router();


userRouter.post("/register",
  registerUserValidateMiddleware,
  checkEmailExistMiddleware,
  userController.register,
);

userRouter.get("/verify/:confirmationToken",
  userController.verifyToken,
);

userRouter.post("/login",
  loginUserValidateMiddleware,
  userController.login,
);

module.exports = userRouter;
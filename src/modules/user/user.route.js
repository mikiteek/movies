const {Router} = require("express");

const checkEmailExistMiddleware = require("./middlewares/checkEmailExistMiddleware");
const registerUserValidateMiddleware = require("./middlewares/registerUserValidateMiddleware");

const userController = require("./user.controller");

const userRouter = Router();



userRouter.post("/register",
  registerUserValidateMiddleware,
  checkEmailExistMiddleware,
  userController.register,
);


module.exports = userRouter;
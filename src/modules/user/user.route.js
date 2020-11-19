const {Router} = require("express");

const checkEmailExistMiddleware = require("./middlewares/checkEmailExistMiddleware");
const registerUserValidateMiddleware = require("./middlewares/registerUserValidateMiddleware");
const loginUserValidateMiddleware = require("./middlewares/loginUserValidateMiddleware");
const authorizeMiddleware = require("./middlewares/authorizeMiddleware");
const checkAdminPermissions = require("./middlewares/checkAdminPermissions");

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

userRouter.post("/logout",
  authorizeMiddleware,
  userController.logout,
);

userRouter.get("/current",
  authorizeMiddleware,
  userController.getCurrentUser
);

userRouter.delete("/:id",
  authorizeMiddleware,
  checkAdminPermissions,
  userController.remove,
);

userRouter.get("/",
  authorizeMiddleware,
  checkAdminPermissions,
  userController.getAllUsers,
)

module.exports = userRouter;
const bcrypt = require("bcryptjs");
const {v4: uuid} = require("uuid");

const User = require("./user.model");

const userToClientHelper = require("../../helpers/userToClientHelper");
const sendEmailHandler = require("../../utils/sendgridEmailHandler");

const COST_FACTOR = require("../../const/costFactor");

class UserController {
  register = async (req, res, next) => {
    try {
      const encryptedPass = await bcrypt.hash(req.body.password, COST_FACTOR);
      const confirmationToken = uuid();
      const user = new User({
        email: req.body.email,
        password: encryptedPass,
        confirmationToken,
      });

      const savedUser = await user.save();
      await sendEmailHandler(savedUser.email, confirmationToken);
      const userToClient = {
        user: userToClientHelper(savedUser),
      }
      return res.status(201).json(userToClient);
    }
    catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
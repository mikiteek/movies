const bcrypt = require("bcryptjs");

const User = require("./user.model");

const userToClientHelper = require("../../helpers/userToClientHelper");

const COST_FACTOR = require("../../const/costFactor");

class UserController {
  register = async (req, res, next) => {
    try {
      const encryptedPass = await bcrypt.hash(req.body.password, COST_FACTOR);

      const user = new User({
        email: req.body.email,
        password: encryptedPass,
      });

      const savedUser = await user.save();
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
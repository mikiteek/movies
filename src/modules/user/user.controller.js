const bcrypt = require("bcryptjs");
const {v4: uuid} = require("uuid");
const jwt = require("jsonwebtoken");

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

  verifyToken = async (req, res, next) => {
    try {
      const {confirmationToken} = req.params;
      const user = await User.findOne({confirmationToken});
      if (!user) {
        return res.status(404).json({message: "Not found"});
      }

      await User.findByIdAndUpdate(user._id, {confirmationToken: null, confirmed: true});
      return res.status(200).json({message: "You have successfully verified email"});
    }
    catch (e) {
      next(e);
    }
  }

  login = async (req, res, next) => {
    try {
      const {password, email} = req.body;
      const userToFind = await User.findOne({email});
      if (!userToFind) {
        return res.status(401).json({message: "Not authorized"});
      }
      const isPassValid = await bcrypt.compare(password, userToFind.password);
      if (!isPassValid) {
        return res.status(401).json({message: "Not authorized"});
      }
      if (!userToFind.confirmed) {
        return res.status(401).json({message: "Please verify your email"});
      }

      const token = await jwt.sign({id: userToFind._id, role: userToFind.role}, process.env.JWT_SECRET);
      const userToClient = {
        user: userToClientHelper(userToFind),
        token,
      }
      return res.status(200).json(userToClient);
    }
    catch (e) {
      next(e);
    }
  }

  logout = async (req, res, next) => {
    try {
      return res.status(204).send();
    }
    catch (e) {
      next(e);
    }
  }
}

module.exports = new UserController();
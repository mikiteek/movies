const checkAdminPermissions = (req, res, next) => {
  try {
    const {jwtEncrypted: {role}} = req;
    if (role !== "admin") {
     return res.status(403).json({message: "Not permissions"});
    }
    next();
  }
  catch (e) {
    next(e);
  }
}

module.exports = checkAdminPermissions;
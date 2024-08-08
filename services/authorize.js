// get data from auth token
exports.getAuthData = (req, res, next) => {
  try {
    const authData = {
      authId: req.auth.id,
      authUsername: req.auth.username,
      authRole: req.auth.role,
    };
    return authData;
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Decode token fail",
    });
  }
};

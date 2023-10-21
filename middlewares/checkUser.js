const ApiError = require("../utils/apiError")

const checkUser = (req, res, next) => {
  console.log(req.user.role)
  console.log(req.params.id)
  if (req.user.role != "Super admin" && req.params.id != req.user.id)
    return next(
      new ApiError("You do not have permission to perform this action", 401)
    )

  return next()
}
module.exports = checkUser

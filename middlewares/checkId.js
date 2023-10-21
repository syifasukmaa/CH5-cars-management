const { Car, User } = require("../models")
const ApiError = require("../utils/apiError")

const checkId = (model) => {
  return async (req, res, next) => {
    try {
      const id = req.params.id
      const contentId = await model.findByPk(id)

      if (!contentId) {
        return next(new ApiError(` id ${id} doesn't exist`, 404))
      }

      next()
    } catch (err) {
      return next(new ApiError(err.message, 500))
    }
  }
}

module.exports = checkId

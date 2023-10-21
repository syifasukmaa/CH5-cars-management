const router = require("express").Router()

const { User } = require("../models")

const user = require("../controller/userController")
const Auth = require("../controller/authController")
const authenticate = require("../middlewares/authenticate")
const checkRole = require("../middlewares/checkRole")
const checkUser = require("../middlewares/checkUser")
const checkId = require("../middlewares/checkId")


router.get(
  "/",
  authenticate,
  checkRole(["Super admin", "Admin"]),
  user.findAllUser
)
router.get("/:id", checkId(User), authenticate, user.findUserById)
router.patch(
  "/:id",
  checkId(User),
  authenticate,
  checkRole(["Super admin"]),
  user.updateUser
)
router.delete("/:id", checkId(User), authenticate, checkUser, user.deleteUser)

module.exports = router

const router = require("express").Router()

const Auth = require("../controller/authController")
const checkToken = require("../middlewares/checkToken")
const authenticate = require("../middlewares/authenticate")
const checkRole = require("../middlewares/checkRole")

router.post("/member/register", Auth.register)
router.post("/member/login", Auth.login)

router.post(
  "/admin/register",
  authenticate,
  checkRole(["Super admin"]),
  Auth.register
)
router.post("/admin/login", Auth.login)

router.get("/me", checkToken, Auth.checktoken)

module.exports = router

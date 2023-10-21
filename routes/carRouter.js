const router = require("express").Router()

const { Car } = require("../models")
const car = require("../controller/carController")
const upload = require("../utils/multer")
const authenticate = require("../middlewares/authenticate")
const checkRole = require("../middlewares/checkRole")
const checkId = require("../middlewares/checkId")

router.post(
  "/",
  authenticate,
  checkRole(["Super admin", "Admin"]),
  upload.single("image"),
  car.createCar
)
router.get("/", authenticate, car.findCars)
router.get(
  "/:id",
  checkId(Car),
  authenticate,
  checkRole(["Super admin", "Admin"]),
  car.findCarById
)
router.patch(
  "/:id",
  checkId(Car),
  authenticate,
  checkRole(["Super admin", "Admin"]),
  upload.single("image"),
  car.updateCar
)
router.delete(
  "/:id",
  checkId(Car),
  authenticate,
  checkRole(["Super admin", "Admin"]),
  car.deleteCar
)

module.exports = router

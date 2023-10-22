const router = require("express").Router()
const swaggerUi = require("swagger-ui-express")
const swaggerDocument = require("../docs/swagger.json")

const Admin = require("./adminRouter")
const Auth = require("./authRouter")
const Car = require("./carRouter")
const User = require("./userRouter")

router.use("/api-docs", swaggerUi.serve)
router.use("/api-docs", swaggerUi.setup(swaggerDocument))

router.use("/api/v1/cars", Car)
router.use("/api/v1/auth", Auth)
router.use("/api/v1/users", User)
router.use("/", Admin)

module.exports = router

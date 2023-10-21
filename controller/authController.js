const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { Auth, User, Shop } = require("../models")
const ApiError = require("../utils/apiError")

const register = async (req, res, next) => {
  try {
    const { name, email, password, confirmPassword, age, address, role } =
      req.body

    const user = await Auth.findOne({
      where: {
        email,
      },
    })

    // validasi untuk cek apakah email sudah ada atau belum
    if (user) {
      return next(new ApiError("User email already taken", 404))
    }

    // minimum password length
    const passwordLength = password.length <= 8
    if (passwordLength) {
      return next(new ApiError("Minimum password must be 8 charachter", 400))
    }

    //hashing password
    const saltRounds = 10
    const hashedPassword = bcrypt.hashSync(password, saltRounds)
    const hashedConfirmdPassword = bcrypt.hashSync(confirmPassword, saltRounds)

    const newUser = await User.create({
      name,
      address,
      age,
      role,
    })

    await Auth.create({
      email,
      password: hashedPassword,
      confirmPassword: hashedConfirmdPassword,
      userId: newUser.id,
    })

    // console.log(test);

    res.status(201).json({
      status: "success",
      data: {
        ...newUser,
        email,
      },
    })
  } catch (err) {
    return next(new ApiError(err.message, 500))
  }
}

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await Auth.findOne({
      where: {
        email,
      },
      include: ["User"],
    })

    if (user && bcrypt.compareSync(password, user.password)) {
      //token jwt untuk autentikasi
      const token = jwt.sign(
        {
          id: user.userId,
          username: user.User.name,
          role: user.User.role,
          email: user.email,
          shopId: user.User.userId,
        },
        process.env.JWT_SECRET
      )

      res.status(200).json({
        status: "success",
        message: "User success login",
        data: token,
      })
    } else {
      return next(new ApiError("wrong password or user doesn't exist", 400))
    }
  } catch (err) {
    next(new ApiError(err.message, 500))
  }
}

const checktoken = (req, res) => {
  try {
    const userData = req.user
    res.status(200).json({
      status: "Success",
      data: userData,
    })
  } catch (error) {
    return next(new ApiError(err.message, 500))
  }
}

module.exports = { register, login, checktoken }

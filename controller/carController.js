const { Car } = require("../models/index")
const imagekit = require("../lib/imagekit")
const cloudinary = require("../lib/cloudinary")
const ApiError = require("../utils/apiError")
const { Op } = require("sequelize")
const car = require("../models/car")

const createCar = async (req, res, next) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path)
    const { name, price, size, available } = req.body

    const car = await Car.create({
      name,
      price,
      size,
      available,
      image: result.secure_url,
      imageId: result.public_id,
      createdBy: req.user.id,
      updatedBy: req.user.id,
    })

    res.status(201).json({
      status: "success",
      message: "Success create new car",
      data: { car },
    })
  } catch (err) {
    return next(new ApiError(err.message, 400))
  }
}

const findCars = async (req, res, next) => {
  try {
    const { name, available, size } = req.query
    const condition = {
      deletedAt: null,
    }

    if (name) {
      condition.name = { [Op.iLike]: "%" + name + "%" }
    }
    if (available) {
      condition.available = available
    }
    if (size) {
      condition.size = size
    }

    const cars = await Car.findAll({
      paranoid: false,
      where: condition,
      include: ["creator", "updater", "deleter"],
    })

    if (cars.length == 0) return next(new ApiError(`Car doesn't exist`, 404))

    res.status(200).json({
      status: "Success",
      data: { cars },
    })
  } catch (err) {
    return next(new ApiError(err.message, 400))
  }
}

const findCarById = async (req, res, next) => {
  try {
    const car = await Car.findOne({
      where: {
        id: req.params.id,
      },
      include: ["creator", "updater", "deleter"],
    })

    res.status(200).json({
      status: "Success",
      data: { car },
    })
  } catch (err) {
    return next(new ApiError(err.message, 400))
  }
}

const updateCar = async (req, res, next) => {
  try {
    const id = req.params.id
    const { name, size, available } = req.body
    let price = parseFloat(req.body.price)
    const file = req?.file

    const carId = await Car.findOne({ where: { id } })

    let imageUrl = carId.image
    let imageIdToUpdate = carId.imageId

    const carData = !file
      ? {
          name,
          price,
          size,
          available,
          image: imageUrl,
          imageId: imageIdToUpdate,
          updatedBy: req.user.id,
        }
      : {
          name,
          price,
          size,
          available,
          image: (await cloudinary.uploader.upload(req.file.path)).secure_url,
          imageId: (await cloudinary.uploader.upload(req.file.path)).public_id,
          updatedBy: req.user.id,
        }

    const car = await Car.update(carData, { where: { id }, returning: true })
    res.status(201).json({
      status: "success",
      message: "Success update car",
      data: { car },
    })
  } catch (err) {
    return next(new ApiError(err.message, 400))
  }
}

const deleteCar = async (req, res, next) => {
  try {
    const id = req.params.id

    let carId = await Car.findOne({ where: { id } })
    await cloudinary.uploader.destroy(carId.imageId)

    await Car.update(
      {
        deletedBy: req.user.id,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )

    await Car.destroy({ where: { id } })

    res.status(200).json({
      status: "success",
      message: `Success delete car where id ${id}`,
      data: null,
    })
  } catch (err) {
    return next(new ApiError(err.message, 400))
  }
}

module.exports = {
  createCar,
  findCars,
  findCarById,
  updateCar,
  deleteCar,
}

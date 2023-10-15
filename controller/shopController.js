const ApiError = require('../utils/apiError');
const { Shop, User } = require('../models');

const createShop = async (req, res, next) => {
  const { name } = req.body;
  try {
    const newShop = await Shop.create({
      name,
    });

    res.status(201).json({
      status: 'Success',
      data: { newShop },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};
const findShops = async (req, res, next) => {
  // const { name } = req.query;
  try {
    const shops = await Shop.findAll({
      include: ['Users', 'Products'],
    });

    res.status(200).json({
      status: 'Success',
      data: { shops },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateShop = async (req, res, next) => {
  const { name } = req.body;
  const id = req.params.id;
  try {
    const findShop = await Shop.findOne({
      where: { id },
      include: ['Users'],
    });
    if (!findShop) {
      return next(new ApiError(`Not found!, id with ${id} are not exist`, 404));
    }
    const shop = await Shop.update(
      {
        name: name,
      },
      { where: { id } }
    );
    res.status(200).json({
      status: `Success`,
      message: `Success, shop updated where id ${id}`,
      data: {
        findShop,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

const deleteShop = async (req, res, next) => {
  const id = req.params.id;
  try {
    const findShop = await Shop.findOne({ where: { id } });
    if (!findShop) {
      return next(new ApiError(`Not found!, id with ${id} are not exist`, 404));
    }
    const shop = await Shop.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json({
      status: `Success`,
      message: `Success, shop deleted where id ${id}`,
      data: null,
    });
  } catch (error) {
    next(new ApiError(error.message, 500));
  }
};

module.exports = { createShop, findShops, updateShop, deleteShop };

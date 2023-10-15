const { User } = require('../models');
const ApiError = require('../utils/apiError');

const findAllUser = async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: ['Auth', 'Shop'],
    });

    res.status(200).json({
      status: 'success',
      data: {
        users,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const findUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
      include: ['Auth', 'Shop'],
    });

    res.status(200).json({
      status: 'success',
      data: {
        user,
      },
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const updateUser = async (req, res, next) => {
  const { name, age, address, role } = req.body;
  try {
    await User.update(
      {
        name,
        age,
        address,
        role,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: 'success',
      message: 'User updated',
    });
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!user) {
      next(new ApiError('User not found', 404));
    }

    await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'User deleted',
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  findAllUser,
  findUserById,
  updateUser,
  deleteUser,
};

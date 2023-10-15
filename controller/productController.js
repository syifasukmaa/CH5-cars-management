const { Product } = require('../models/index');
const imagekit = require('../lib/imagekit');
const ApiError = require('../utils/apiError');

const createProduct = async (req, res, next) => {
  const { name, price, stock } = req.body;
  console.log(req.user);
  const shopId = req.user.shopId;
  let img;
  const file = req.file;

  try {
    if (file) {
      // dapatkan extension file nya
      const split = file.originalname.split('.');
      const extension = split[split.length - 1];

      // upload file ke imagekit
      const uploadedImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      img = uploadedImage.url;
    }

    const newProduct = await Product.create({
      name,
      price,
      stock,
      imageUrl: img,
      shopId,
    });

    res.status(200).json({
      status: 'Success',
      data: { newProduct },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findProducts = async (req, res, next) => {
  try {
    const products = await Product.findAll();

    res.status(200).json({
      status: 'Success',
      data: { products },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findProductById = async (req, res, next) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: 'Success',
      data: { product },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateProduct = async (req, res, next) => {
  const { name, price, stock } = req.body;

  try {
    const product = await Product.update(
      {
        name,
        price,
        stock,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      status: 'Success',
      message: 'Success updated product',
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteProduct = async (req, res, next) => {
  const { name, price, stock } = req.body;

  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!product) {
      return next(new ApiError('Product id tersebut gak ada', 404));
    }

    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: 'Success',
      message: 'Success deleted product',
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createProduct,
  findProducts,
  findProductById,
  updateProduct,
  deleteProduct,
};

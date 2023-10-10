const { Product } = require('../models/index');
const imagekit = require('../lib/imagekit');
const ApiError = require('../utils/apiError');

const createProduct = async (req, res, next) => {
  const { name, price, stock } = req.body;
  const file = req.file;

  //dapatkan extensi filenya
  const split = file.originalname.split();
  const extension = split[split.length - 1];

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

    // const img = await imagekit.upload({
    //   file: file.buffer,
    //   fileName: `IMG=${Date.now()}.${extension}`,
    // });
    const newProduct = await Product.create({
      name,
      price,
      stock,
      imageUrl: img.url,
    });

    res.status(200).json({
      status: 'success',
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
      status: 'success',
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
      status: 'success',
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
      status: 'success',
      message: 'success updated product',
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
      status: 'success',
      message: 'success deleted product',
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

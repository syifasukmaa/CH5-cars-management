const { Product } = require('../models/index');

const createProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  try {
    const newProduct = await Product.create({
      name,
      price,
      stock,
    });

    res.status(200).json({
      status: 'success',
      data: { newProduct },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};

const findProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.status(200).json({
      status: 'success',
      data: { products },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};

const findProductById = async (req, res) => {
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
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};

const updateProduct = async (req, res) => {
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
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  const { name, price, stock } = req.body;

  try {
    const product = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: 'success',
      message: 'success deleted product',
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};

module.exports = {
  createProduct,
  findProducts,
  findProductById,
  updateProduct,
  deleteProduct,
};

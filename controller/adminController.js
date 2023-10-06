const { Product } = require('../models/index');
const imagekit = require('../lib/imagekit');

const createPage = async (req, res) => {
  res.render('create.ejs');
};

const createProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  const file = req.file;

  //dapatkan extensi filenya
  const split = file.originalname.split('.');
  const extension = split[split.length - 1];

  try {
    const img = await imagekit.upload({
      file: file.buffer,
      fileName: `IMG=${Date.now()}.${extension}`,
    });
    await Product.create({
      name,
      price,
      stock,
      imageUrl: img.url,
    });

    res.redirect('/dashboard/admin');
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

    res.render('index.ejs', {
      products,
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
  }
};

module.exports = {
  createPage,
  createProduct,
  findProducts,
};

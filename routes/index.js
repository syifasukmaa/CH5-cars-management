const router = require('express').Router();

// const Product = require('./productRouter');
const Admin = require('./adminRouter');
const Auth = require('./authRouter');
const Car = require('./carRouter');
const User = require('./userRouter');

// router.use('/api/v1/products', Product);

router.use('/api/v1/cars', Car);
router.use('/api/v1/auth', Auth);
router.use('/api/v1/users', User);
router.use('/', Admin);

module.exports = router;

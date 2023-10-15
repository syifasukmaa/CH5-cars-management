const router = require('express').Router();

const User = require('../controller/userController');
const Auth = require('../controller/authController');
// const autentiksi = require('../middlewares/authenticate');

router.post('/', Auth.register);
router.get('/', User.findAllUser);
router.get('/:id', User.findUserById);
router.patch('/:id', User.updateUser);
router.delete('/:id', User.deleteUser);

module.exports = router;

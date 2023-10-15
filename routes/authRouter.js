const router = require('express').Router();

const Auth = require('../controller/authController');
const checkToken = require('../middlewares/checkToken');

router.post('/register', Auth.register);
router.post('/login', Auth.login);
router.get('/checkToken', checkToken, Auth.checktoken);

module.exports = router;

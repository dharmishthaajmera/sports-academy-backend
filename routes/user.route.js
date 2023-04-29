const { Router } = require('express');

const userController = require('../controllers/user.controller');
const userValidator = require('../validators/user.validator');
const bookingValidator = require('../validators/booking.validator');
const bookingController = require('../controllers/booking.controller');
const { responseHandler } = require('../helper/generic-response');
const { checkAccessToken, checkRefreshToken } = require('../middlewares/authenticate');

const router = Router();

router.post('/forget-password', userValidator.forgetPasswordSchema, userController.forgetPassword);
router.post('/reset-password/:token', userValidator.resetPasswordSchema, userController.resetPassword, responseHandler);
router.post('/', userValidator.addUserSchema, userController.addUser, responseHandler, responseHandler);
router.patch('/', checkAccessToken, userValidator.updateUserSchema, userController.updateUser, responseHandler);
router.post('/login', userValidator.loginUserSchema, userController.loginUser, responseHandler);
router.post('/generate-access-token', checkRefreshToken, userController.generateAccessToken, responseHandler);
router.delete('/', checkRefreshToken, userController.deleteUser, responseHandler);
router.post('/logout', checkAccessToken, userController.logoutUser, responseHandler);
router.post('/booking', checkAccessToken, bookingValidator.addBooking, bookingController.addBooking, responseHandler);
router.get('/', checkAccessToken, userController.getUserDataFromToken, responseHandler);

module.exports = router;

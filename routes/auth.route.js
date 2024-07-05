const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { body } = require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register',
  body('email').isEmail(),
  body('password').isLength({
  min: 6,
  max: 30
}) , authController.register)
router.get('/activation/:id', authController.activation)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get('/refresh', authController.refresh)
router.get('/get-users', authMiddleware , authController.getUsers)

module.exports = router;
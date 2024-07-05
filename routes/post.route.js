const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const authorMiddleware = require('../middlewares/author.middleware');

router.get('/getAll', postController.getAll);
router.post('/create', authMiddleware ,postController.create);
router.delete('/delete/:id', authMiddleware, authorMiddleware, postController.delete);
router.put('/update/:id', authMiddleware , authorMiddleware, postController.update);
router.get('/getById/:id', postController.getById);

module.exports = router;
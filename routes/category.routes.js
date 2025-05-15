const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const auth = require('../middleware/auth.middleware');

router.post('/', auth.verifyToken, auth.isAdmin, categoryController.createCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getCategoryById);
router.put('/:id', auth.verifyToken, auth.isAdmin, categoryController.updateCategory);
router.delete('/:id', auth.verifyToken, auth.isAdmin, categoryController.deleteCategory);

module.exports = router;

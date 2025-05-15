const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const auth = require('../middleware/auth.middleware');
const multer = require('multer');

// Configuración de subida de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // asegúrate de crear esta carpeta
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage });

router.post('/', auth.verifyToken, auth.isAdmin, upload.single('image'), productController.createProduct);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put('/:id', auth.verifyToken, auth.isAdmin, upload.single('image'), productController.updateProduct);
router.delete('/:id', auth.verifyToken, auth.isAdmin, productController.deleteProduct);

module.exports = router;

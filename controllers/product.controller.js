const Product = require('../models/product.model');

// Crear producto
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category } = req.body;
    const image = req.file ? req.file.filename : null;

    const product = new Product({ name, description, price, stock, category, image });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el producto', error: err.message });
  }
};

// Listar todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos', error: err.message });
  }
};

// Ver detalle de un producto
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar producto', error: err.message });
  }
};

// Actualizar producto
exports.updateProduct = async (req, res) => {
  try {
    const updates = req.body;
    if (req.file) updates.image = req.file.filename;

    const product = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar producto', error: err.message });
  }
};

// Eliminar (marcar como inactivo)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    res.json({ message: 'Producto desactivado', product });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar producto', error: err.message });
  }
};

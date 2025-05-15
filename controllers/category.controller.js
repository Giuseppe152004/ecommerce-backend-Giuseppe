const Category = require('../models/category.model');

// Crear categoría
exports.createCategory = async (req, res) => {
  try {
    const { name, subcategories } = req.body;
    const category = new Category({
      name,
      subcategories: subcategories || []
    });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear categoría', error: err.message });
  }
};

// Obtener todas las categorías
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener categorías', error: err.message });
  }
};

// Obtener una categoría por ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar categoría', error: err.message });
  }
};

// Actualizar una categoría
exports.updateCategory = async (req, res) => {
  try {
    const updates = req.body;
    const category = await Category.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!category) return res.status(404).json({ message: 'Categoría no encontrada' });
    res.json(category);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar categoría', error: err.message });
  }
};

// Eliminar (o desactivar) categoría
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, { isActive: false }, { new: true });
    res.json({ message: 'Categoría desactivada', category });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar categoría', error: err.message });
  }
};


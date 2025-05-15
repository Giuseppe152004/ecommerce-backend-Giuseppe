const User = require('../models/user.model');
const { generarToken } = require('../utils/jwt');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'Email ya registrado' });

    const user = new User({ name, email, password, role });
    await user.save();
    const token = generarToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ msg: 'Error al registrar', error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ msg: 'Credenciales incorrectas' });
    }
    const token = generarToken(user);
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ msg: 'Error al iniciar sesión', error: err.message });
  }
};

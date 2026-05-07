import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//REGISTER: crea nuevo usuario con seguridad
export const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    // 1. Validaciones de presencia
    if (!nombre || !email || !password) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }
    // 2. Validación de formato: se usa una expresión regular (Regex) para el email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }
     // 3. Validación de fuerza de contraseña
    if (password.length < 6) {
      return res.status(400).json({ error: "La contraseña debe tener al menos 6 caracteres" });
    }
    // 4. Verificación de duplicados: evita colisiones en la base de datos
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Usuario ya existe" });
    }

     // 5. ENCRIPTACIÓN: Hasheamos la contraseña antes de guardarla 
    // El "10" es el número de rondas de salting (costo computacional)
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      nombre,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Devolvemos el usuario creado sin la contraseña por seguridad
    res.status(201).json({
      _id: user._id,
      nombre: user.nombre,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ error: "Error en registro" });
  }
};

// LOGIN: Autentica al usuario y genera un token de acceso
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email y contraseña requeridos" });
    }
    // 1. Buscar usuario por email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Usuario no existe" });
    }

    // 2. Comparar hashes: bcrypt compara la clave ingresada con el hash de la DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // 3. Generación del Token (24h)
    // El "payload" contiene el ID del usuario. Se firma con una clave secreta.
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET || "clave_secreta_provisional",
      { expiresIn: "24h" }
    );

    res.json({
      message: "Login correcto",
      token,
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error en el proceso de login:", error);
    res.status(500).json({ error: "Error en login" });
  }
};

// GET PROFILE:Recupera datos del usuario logueado
export const getProfile = async (req, res) => {
  try {
    // req.user.id debe ser inyectado por un middleware de autenticación previo
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ error: "Error al obtener perfil" });
  }
};
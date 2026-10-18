import dns from 'node:dns';

// Usar DNS públicos para resolver el registro SRV de MongoDB Atlas.
dns.setServers(['8.8.8.8', '1.1.1.1']);

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// ===============================
// MODELOS DE MONGODB
// ===============================

const User = mongoose.models.User || mongoose.model(
  'User',
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
      },
      password: {
        type: String,
        required: true
      }
    },
    { timestamps: true }
  )
);

const Product = mongoose.models.Product || mongoose.model(
  'Product',
  new mongoose.Schema(
    {
      nombre: {
        type: String,
        required: true,
        trim: true
      },
      categoria: {
        type: String,
        default: 'Deportes',
        trim: true
      }
    },
    { timestamps: true }
  )
);

// ===============================
// AUTENTICACIÓN
// ===============================

function tokenPara(user) {
  return jwt.sign(
    {
      id: user._id.toString()
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '8h'
    }
  );
}

function proteger(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith('Bearer ')) {
    return res.status(401).json({
      mensaje: 'Debes iniciar sesión.'
    });
  }

  try {
    const token = authorization.slice(7);

    req.usuario = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    next();
  } catch {
    return res.status(401).json({
      mensaje: 'Sesión inválida o vencida.'
    });
  }
}

// ===============================
// RUTAS GENERALES
// ===============================

app.get('/', (_req, res) => {
  res.json({
    mensaje: 'API del proyecto Momento 3',
    estado: 'funcionando',
    endpoints: [
      '/api/health',
      '/api/auth/register',
      '/api/auth/login',
      '/api/productos'
    ]
  });
});

app.get('/api/health', (_req, res) => {
  res.json({
    estado: 'ok',
    servidor: 'funcionando',
    mongodb: mongoose.connection.readyState === 1
      ? 'conectado'
      : 'desconectado'
  });
});

// ===============================
// REGISTRO DE USUARIOS
// ===============================

app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      typeof name !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !name.trim() ||
      !email.trim() ||
      password.length < 6
    ) {
      return res.status(400).json({
        mensaje:
          'Completa todos los campos. La contraseña debe tener al menos 6 caracteres.'
      });
    }

    const correo = email.trim().toLowerCase();

    const usuarioExistente = await User.findOne({
      email: correo
    });

    if (usuarioExistente) {
      return res.status(409).json({
        mensaje: 'Ese correo ya está registrado.'
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: name.trim(),
      email: correo,
      password: passwordHash
    });

    return res.status(201).json({
      mensaje: 'Usuario registrado correctamente.',
      token: tokenPara(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        mensaje: 'Ese correo ya está registrado.'
      });
    }

    console.error('Error en el registro:', error.message);

    return res.status(500).json({
      mensaje: 'Error al registrar el usuario.'
    });
  }
});

// ===============================
// INICIO DE SESIÓN
// ===============================

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        mensaje: 'Ingresa tu correo y contraseña.'
      });
    }

    const user = await User.findOne({
      email: email.trim().toLowerCase()
    });

    if (
      !user ||
      !(await bcrypt.compare(password, user.password))
    ) {
      return res.status(401).json({
        mensaje: 'Correo o contraseña incorrectos.'
      });
    }

    return res.json({
      mensaje: 'Inicio de sesión correcto.',
      token: tokenPara(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error.message);

    return res.status(500).json({
      mensaje: 'Error al iniciar sesión.'
    });
  }
});

// ===============================
// CONSULTAR PRODUCTOS (GET)
// ===============================

app.get('/api/productos', proteger, async (_req, res) => {
  try {
    const productos = await Product.find().sort({
      createdAt: -1
    });

    return res.json(productos);
  } catch (error) {
    console.error('Error al consultar productos:', error.message);

    return res.status(500).json({
      mensaje: 'No se pudieron consultar los productos.'
    });
  }
});

// ===============================
// AGREGAR PRODUCTO (POST)
// ===============================

app.post('/api/productos', proteger, async (req, res) => {
  try {
    const { nombre, categoria } = req.body;

    if (
      typeof nombre !== 'string' ||
      !nombre.trim()
    ) {
      return res.status(400).json({
        mensaje: 'El nombre del producto es obligatorio.'
      });
    }

    const producto = await Product.create({
      nombre: nombre.trim(),
      categoria:
        typeof categoria === 'string' && categoria.trim()
          ? categoria.trim()
          : 'Deportes'
    });

    return res.status(201).json(producto);
  } catch (error) {
    console.error('Error al crear producto:', error.message);

    return res.status(500).json({
      mensaje: 'No se pudo crear el producto.'
    });
  }
});

// ===============================
// ACTUALIZAR PRODUCTO (PUT)
// ===============================

app.put('/api/productos/:id', proteger, async (req, res) => {
  try {
    const { nombre, categoria } = req.body;
    const cambios = {};

    if (nombre !== undefined) {
      if (typeof nombre !== 'string' || !nombre.trim()) {
        return res.status(400).json({
          mensaje: 'El nombre no puede estar vacío.'
        });
      }

      cambios.nombre = nombre.trim();
    }

    if (categoria !== undefined) {
      if (typeof categoria !== 'string' || !categoria.trim()) {
        return res.status(400).json({
          mensaje: 'La categoría no puede estar vacía.'
        });
      }

      cambios.categoria = categoria.trim();
    }

    if (Object.keys(cambios).length === 0) {
      return res.status(400).json({
        mensaje: 'Debes enviar algún dato para actualizar.'
      });
    }

    const producto = await Product.findByIdAndUpdate(
      req.params.id,
      cambios,
      {
        new: true,
        runValidators: true
      }
    );

    if (!producto) {
      return res.status(404).json({
        mensaje: 'Producto no encontrado.'
      });
    }

    return res.json(producto);
  } catch (error) {
    console.error('Error al actualizar producto:', error.message);

    return res.status(400).json({
      mensaje:
        'No se pudo actualizar el producto. Verifica su identificador.'
    });
  }
});

// ===============================
// ELIMINAR PRODUCTO (DELETE)
// ===============================

app.delete('/api/productos/:id', proteger, async (req, res) => {
  try {
    const producto = await Product.findByIdAndDelete(
      req.params.id
    );

    if (!producto) {
      return res.status(404).json({
        mensaje: 'Producto no encontrado.'
      });
    }

    return res.json({
      mensaje: 'Producto eliminado correctamente.'
    });
  } catch (error) {
    console.error('Error al eliminar producto:', error.message);

    return res.status(400).json({
      mensaje:
        'No se pudo eliminar el producto. Verifica su identificador.'
    });
  }
});

// ===============================
// CONEXIÓN A MONGODB E INICIO
// ===============================

async function iniciarServidor() {
  const mongoURI =
    process.env.MONGO_URI || process.env.MONGODB_URI;

  if (!mongoURI) {
    console.error(
      'Falta MONGO_URI en el archivo backend/.env'
    );
    process.exit(1);
  }

  if (!process.env.JWT_SECRET) {
    console.error(
      'Falta JWT_SECRET en el archivo backend/.env'
    );
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI);

    console.log('MongoDB conectado correctamente.');

    app.listen(PORT, () => {
      console.log(`API lista en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(
      'No se pudo conectar a MongoDB:',
      error.message
    );

    process.exit(1);
  }
}

iniciarServidor();
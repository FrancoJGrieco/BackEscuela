const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

async function signup (req, res) {
  try {
    const { user, password } = req.body

    if (!user || !password) {
      res.status(400).json({ error: 'Usuario y contraseña son obligatorios' })
      return
    }

    if (password.length < 6) {
      res.status(400).json({ error: 'La contraseña debe tener al menos 6 caracteres' })
      return
    }

    const usuarioExistente = await Usuario.findOne({ user })
    if (usuarioExistente) {
      res.status(409).json({ error: 'El usuario ya existe' })
      return
    }

    const hashedPassword = bcrypt.hashSync(password, 8)

    await Usuario.create({ user, password: hashedPassword })

    res.sendStatus(201)
  } catch (err) {
    console.error('Error en signup:', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
  }
}
async function login (req, res) {
  try {
    const { user, password } = req.body

    if (!user || !password) {
      res.status(400).json({ error: 'Usuario y contraseña son obligatorios' })
      return
    }

    const usuario = await Usuario.findOne({ user })
    if (!usuario) {
      res.status(401).json({ error: 'Credenciales inválidas' })
      return
    }

    const passwordMatch = await bcrypt.compare(password, usuario.password)
    if (!passwordMatch) {
      res.status(401).json({ error: 'Credenciales inválidas' })
      return
    }

    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30
    const token = jwt.sign({ sub: usuario._id, exp }, process.env.SECRET)

    res.cookie('Authorization', token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    })

    res.status(200).json({ success: 'Login exitoso', token })
  } catch (err) {
    console.error('Error en login:', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
  }
}
function logout (req, res) {
  try {
    res.clearCookie('Authorization')
    res.status(200).json({ success: 'Logout exitoso' })
  } catch (err) {
    console.error('Error en logout:', err)
    if (!res.headersSent) res.status(500).json({ error: 'Error interno del servidor' })
  }
}

function checkAuth (req, res) {
  try {
    if (!req.cookies.Authorization) {
      res.status(401).json({ error: 'No autenticado' })
      return
    }
    const token = req.cookies.Authorization
    const decoded = jwt.verify(token, process.env.SECRET)

    res.status(200).json({ success: 'Autenticado', userId: decoded.sub })
  } catch (err) {
    console.error('Error en checkAuth:', err)
    res.status(401).json({ error: 'Token inválido o expirado' })
  }
}

module.exports = {
  signup,
  login,
  logout,
  checkAuth
}

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

async function signup (req, res) {
  try {
    const { user, password } = req.body

    const hashedPassword = bcrypt.hashSync(password, 8)

    await Usuario.create({ user, password: hashedPassword })

    res.sendStatus(201)
  } catch (err) {
    console.log(err)
    res.sendStatus(400)
  }
}
async function login (req, res) {
  try {
    const { user, password } = req.body

    const usuario = await Usuario.findOne({ user })
    if (!usuario) return res.sendStatus(401)

    const passwordMatch = bcrypt.compareSync(password, usuario.password)
    if (!passwordMatch) return res.sendStatus(401)

    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30
    const token = jwt.sign({ sub: usuario._id, exp }, process.env.SECRET)

    res.cookie('Authorization', token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    })

    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
}
function logout (req, res) {
  try {
    res.clearCookie('Authorization')
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
}

function checkAuth (req, res) {
  try {
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    return res.sendStatus(400)
  }
}

module.exports = {
  signup,
  login,
  logout,
  checkAuth
}

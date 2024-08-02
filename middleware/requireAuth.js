const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

async function requireAuth(req, res, next) {
  try {
    const token = req.cookies.Authorization

    const decoded = jwt.verify(token, process.env.SECRET)

    if (Date.now() > decoded.exp) return res.sendStatus(401)

    const user = await Usuario.findById(decoded.sub)
    if (!user) return res.sendStatus(401)

    res.user = user

    next()
  } catch (err) {
    console.log(err)
    return res.sendStatus(401)
  }
}

module.exports = requireAuth

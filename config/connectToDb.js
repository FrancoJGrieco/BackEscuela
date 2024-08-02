const mongoose = require('mongoose')

async function connectToDb () {
  try {
    await mongoose.connect('mongodb://localhost:27017/Escuela')
    console.log('Connected to database')
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectToDb

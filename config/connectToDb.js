const mongoose = require('mongoose')

async function connectToDb () {
  try {
    console.log('Connection to database:', process.env.DB_URL)
    await mongoose.connect(process.env.DB_URL, {
      ssl: false
    })
    console.log('Connected to database:')
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectToDb

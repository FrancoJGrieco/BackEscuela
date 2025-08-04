const mongoose = require('mongoose')

async function connectToDb () {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: false,
      directConnection: true
    })
    console.log('Connected to database')
  } catch (err) {
    console.log(err)
  }
}

module.exports = connectToDb

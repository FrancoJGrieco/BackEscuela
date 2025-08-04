/* eslint-env jest */

process.env.DB_URL = 'mongodb://localhost:27017/EscuelaTest'
process.env.NODE_ENV = 'test'

const request = require('supertest')
const app = require('../app')
const connectToDb = require('../config/connectToDb')
const mongoose = require('mongoose')

beforeAll(async () => {
  await connectToDb()
})

afterAll(async () => {
  await mongoose.connection.close()
})

describe('POST /login', () => {
  it('debe fallar con credenciales inválidas', async () => {
    const res = await request(app)
      .post('/login')
      .send({ email: 'usuario@noexiste.com', password: 'malpass' })

    expect(res.statusCode).toBe(400)
  })
})

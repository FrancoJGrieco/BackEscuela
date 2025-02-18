const express = require('express')
const connectToDb = require('./config/connectToDb.js')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const alumnosController = require('./controllers/alumnosController.js')
const usuariosController = require('./controllers/usuariosController.js')
const materiasController = require('./controllers/materiasController.js')
const cursosController = require('./controllers/cursosController.js')
const comisionesController = require('./controllers/comisionesController.js')
const boletinesController = require('./controllers/boletinesController.js')
const materiasboletinController = require('./controllers/materiasBoletinController.js')

const requireAuth = require('./middleware/requireAuth.js')
const { correrMigracion } = require('./migrations/migrations.js')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
connectToDb()
correrMigracion()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Authorization']
}))

// Rutas cuentas
app.post('/signup', usuariosController.signup)
app.post('/login', usuariosController.login)
app.get('/logout', usuariosController.logout)
app.get('/check-auth', requireAuth, usuariosController.checkAuth)

// Rutas alumnos
app.get('/alumnos', alumnosController.fetchAlumnos)
app.get('/alumnos/:id', alumnosController.fetchAlumno)
app.get('/alumnos/:id', alumnosController.fetchAlumnoByDNI)
app.post('/alumnos', alumnosController.createAlumno)
app.put('/alumnos/:id', alumnosController.updateAlumno)
app.delete('/alumnos/:id', alumnosController.deleteAlumno)
app.delete('/alumnos', alumnosController.deleteAlumnos)

// Rutas materias
app.get('/materias', materiasController.fetchMaterias)
app.get('/materias/:id', materiasController.fetchMateria)
app.post('/materias', materiasController.createMateria)
app.put('/materias/:id', materiasController.updateMateria)
app.delete('/materias/:id', materiasController.deleteMateria)
app.delete('/materias', materiasController.deleteMaterias)

// Rutas cursos
app.get('/cursos', cursosController.fetchCursos)
app.get('/cursos/:id', cursosController.fetchCurso)
app.post('/cursos', cursosController.createCurso)
app.put('/cursos/:id', cursosController.updateCurso)
app.delete('/cursos/:id', cursosController.deleteCurso)
app.delete('/cursos', cursosController.deleteCursos)

// Rutas comisiones
app.get('/comisiones', comisionesController.fetchComisiones)
app.get('/comisiones/:id', comisionesController.fetchComision)
app.post('/comisiones', comisionesController.createComision)
app.put('/comisiones/:id', comisionesController.updateComision)
app.delete('/comisiones/:id', comisionesController.deleteComision)
app.delete('/comisiones', comisionesController.deleteComisiones)

// Rutas boletines
app.get('/boletines', boletinesController.fetchBoletines)
app.get('/boletines/:id', boletinesController.fetchBoletin)
app.get('/boletinesa/:id', boletinesController.fetchBoletinAlumno)
app.post('/boletines', boletinesController.createBoletin)
app.put('/boletines/:id', boletinesController.updateBoletin)
app.delete('/boletines/:id', boletinesController.deleteBoletin)

// Rutas materiasboletin
app.get('/materias_boletin', materiasboletinController.fetchMateriasBoletin)
app.get('/materias_boletin/:id', materiasboletinController.fetchMateriaBoletin)
app.post('/materias_boletin', materiasboletinController.createMateriaBoletin)
app.put('/materias_boletin/:id', materiasboletinController.updateMateriaBoletin)
app.delete('/materias_boletin/:id', materiasboletinController.deleteMateriaBoletin)

app.use(alumnosController.errorPage)

const PORT = process.env.PORT ?? 3031

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

const express = require('express')
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
app.get('/logout', requireAuth, usuariosController.logout)
app.get('/check-auth', requireAuth, usuariosController.checkAuth)

// Rutas alumnos
app.get('/alumnos', requireAuth, alumnosController.fetchAlumnos)
app.get('/alumnos/:id', requireAuth, alumnosController.fetchAlumno)
app.get('/alumnos/:id', requireAuth, alumnosController.fetchAlumnoByDNI)
app.post('/alumnos', requireAuth, alumnosController.createAlumno)
app.put('/alumnos/:id', requireAuth, alumnosController.updateAlumno)
app.delete('/alumnos/:id', requireAuth, alumnosController.deleteAlumno)
app.delete('/alumnos', requireAuth, alumnosController.deleteAlumnos)

// Rutas materias
app.get('/materias', requireAuth, materiasController.fetchMaterias)
app.get('/materias/:id', requireAuth, materiasController.fetchMateria)
app.post('/materias', requireAuth, materiasController.createMateria)
app.put('/materias/:id', requireAuth, materiasController.updateMateria)
app.delete('/materias/:id', requireAuth, materiasController.deleteMateria)
app.delete('/materias', requireAuth, materiasController.deleteMaterias)

// Rutas cursos
app.get('/cursos', requireAuth, cursosController.fetchCursos)
app.get('/cursos/:id', requireAuth, cursosController.fetchCurso)
app.post('/cursos', requireAuth, cursosController.createCurso)
app.put('/cursos/:id', requireAuth, cursosController.updateCurso)
app.delete('/cursos/:id', requireAuth, cursosController.deleteCurso)
app.delete('/cursos', requireAuth, cursosController.deleteCursos)

// Rutas comisiones
app.get('/comisiones', requireAuth, comisionesController.fetchComisiones)
app.get('/comisiones/:id', requireAuth, comisionesController.fetchComision)
app.post('/comisiones', requireAuth, comisionesController.createComision)
app.put('/comisiones/:id', requireAuth, comisionesController.updateComision)
app.delete('/comisiones/:id', requireAuth, comisionesController.deleteComision)
app.delete('/comisiones', requireAuth, comisionesController.deleteComisiones)

// Rutas boletines
app.get('/boletines', requireAuth, boletinesController.fetchBoletines)
app.get('/boletines/:id', requireAuth, boletinesController.fetchBoletin)
app.get('/boletinesa/:id', requireAuth, boletinesController.fetchBoletinAlumno)
app.post('/boletines', requireAuth, boletinesController.createBoletin)
app.put('/boletines/:id', requireAuth, boletinesController.updateBoletin)
app.delete('/boletines/:id', requireAuth, boletinesController.deleteBoletin)

// Rutas materiasboletin
app.get('/materias_boletin', requireAuth, materiasboletinController.fetchMateriasBoletin)
app.get('/materias_boletin/:id', requireAuth, materiasboletinController.fetchMateriaBoletin)
app.post('/materias_boletin', requireAuth, materiasboletinController.createMateriaBoletin)
app.put('/materias_boletin/:id', requireAuth, materiasboletinController.updateMateriaBoletin)
app.delete('/materias_boletin/:id', requireAuth, materiasboletinController.deleteMateriaBoletin)

app.use(alumnosController.errorPage)

const PORT = process.env.PORT ?? 3031

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})

const mongoose = require('mongoose')

require('dotenv').config()

const Alumno = require('../models/alumno')
const Curso = require('../models/curso')
const Comision = require('../models/comision')
const Materia = require('../models/materia')

mongoose.connect('mongodb://localhost:27017/Escuela').then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB', err))

const ejecutarMigracionAlumnos = async () => {
  try {
    const alumno = await Alumno.findOne({ dni: '40015527' })
    if (alumno) {
      console.log('Ya se ha hecho la migracion de alumnos')
      return
    }

    await Alumno.insertMany([
      { nombre: 'Carlos', apellido: 'Rivera', dni: '40015527', nacimiento: '2023-12-21', mail: 'mail1@mail.com' },
      { nombre: 'Pedro', apellido: 'Casas', dni: '40015528', nacimiento: '2023-12-21', mail: 'mail1@mail.com' },
      { nombre: 'Jose', apellido: 'Alas', dni: '40015529', nacimiento: '2023-12-21', mail: 'mail1@mail.com' },
      { nombre: 'Juan', apellido: 'Miles', dni: '40015530', nacimiento: '2023-12-21', mail: 'mail1@mail.com' },
      { nombre: 'Humberto', apellido: 'Primo', dni: '40015531', nacimiento: '2023-12-21', mail: 'mail1@mail.com' }
    ])

    console.log('Datos iniciales de Alumnos insertados con exito')
  } catch (err) {
    console.error('Error insertando los datos: ', err)
  }
}

const ejecutarMigracionCursos = async () => {
  try {
    const curso = await Curso.findOne({ titulatura: 'Profesorado de Lengua' })
    if (curso) {
      console.log('Ya se ha hecho la migracion de cursos')
      return
    }

    await Curso.insertMany([
      { titulatura: 'Profesorado de Lengua', years: '3', materias: [] },
      { titulatura: 'Tecnico en Computacion', years: '3', materias: [] },
      { titulatura: 'Tecnico en Electronica', years: '3', materias: [] },
      { titulatura: 'Profesorado de Ingles', years: '3', materias: [] }
    ])

    console.log('Datos iniciales de Cursos insertados con exito')
  } catch (err) {
    console.error('Error insertando los datos: ', err)
  }
}

const ejecutarMigracionComisiones = async () => {
  try {
    const comision = await Comision.findOne({ numero: '3-603' })
    if (comision) {
      console.log('Ya se ha hecho la migracion de comisiones')
      return
    }

    await Comision.insertMany([
      { numero: '3-603', year: '3', materias: [], alumnos: [] },
      { numero: '2-606', year: '2', materias: [], alumnos: [] },
      { numero: '3-606', year: '3', materias: [], alumnos: [] },
      { numero: '1-602', year: '1', materias: [], alumnos: [] }
    ])

    console.log('Datos iniciales de Comisiones insertados con exito')
  } catch (err) {
    console.error('Error insertando los datos: ', err)
  }
}

const ejecutarMigracionMaterias = async () => {
  try {
    const materia = await Materia.findOne({ nombre: 'Analisis de Datos I' })
    if (materia) {
      console.log('Ya se ha hecho la migracion de materias')
      return
    }

    await Materia.insertMany([
      { nombre: 'Analisis de Datos I', descripcion: 'Materia de analisis principiante' },
      { nombre: 'Analisis de Datos II', descripcion: 'Materia de analisis intermedio' },
      { nombre: 'Analisis de Datos III', descripcion: 'Materia de analisis avanzado' },
      { nombre: 'Lengua', descripcion: 'Materia de escritura' },
      { nombre: 'Fisica I', descripcion: 'Materia de calculos' },
      { nombre: 'Fisica II', descripcion: 'Materia de calculos' }
    ])

    console.log('Datos iniciales de Materias insertados con exito')
  } catch (err) {
    console.error('Error insertando los datos: ', err)
  }
}

Promise.all([
  ejecutarMigracionComisiones(),
  ejecutarMigracionCursos(),
  ejecutarMigracionMaterias(),
  ejecutarMigracionAlumnos()
]).then(() => mongoose.connection.close())
  .catch((err) => {
    console.log('No se ha podido hacer la migracion: ', err)
  })

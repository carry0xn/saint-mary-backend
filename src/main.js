// main.js
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json())

const alumnosRoutes = require("./routes/alumnosRoutes")
const cursosRoutes = require("./routes/cursoRoutes")
const profesoresRoutes = require("./routes/profesorRoutes")

const db = require('./db/models')
const PORT = 3001 
app.use(cors())
// Rutas
app.use('/alumnos', alumnosRoutes)
app.use('/cursos', cursosRoutes)
app.use('/profesores', profesoresRoutes)

app.get("/", (req, res) => {
    res.send("Hola mundo")
})

// Iniciar servidor
app.listen(PORT, async ()=>{
    console.log(`Aplicación corriendo en el puerto ${PORT}`)
    await db.sequelize.sync() 
})
const express = require('express')
const dotenv = require('dotenv')
const mongoDB = require('./config/mongoose')
const authRoutes = require('./routes/authRoutes')
const postRoutes = require('./routes/postRoutes');
const PORT= process.env.PORT || 3000
const app = express()

app.use(express.json())

app.use('/', authRoutes)
app.use('/', postRoutes)

mongoDB.then( () => {
    app.listen(PORT, () => {
        console.log("Server is running!")
    })
} ).catch((error) => {
    console.log("Error in connecting to DB!")
})


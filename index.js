require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const app = express()


app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

app.get('/', (req, res) => { res.json({ message: 'Oi Express!' }) })

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose
    .connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.jbqlt.mongodb.net/?retryWrites=true&w=majority`)
    .then(
        () => {
            console.log('Conectamos com o MongoDB!')
            app.listen(3000)
        }
    )
    .catch((err) => { console.log(err) })

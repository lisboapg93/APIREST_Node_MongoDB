require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
)


app.use(express.json())


const personRoutes = require('./routes/personRoutes')

app.use('/person', personRoutes)

//rota inicial / endpoint
app.get('/', (req, res) => {
//mostrar req

    res.json({message: 'Oi, esta funcionando!'})
})

const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)


mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.ydbbxhy.mongodb.net/?retryWrites=true&w=majority`,
        
)
.then(() => {
    console.log('Conectamos ao mongo!')
    app.listen(3000)
})
.catch((err) => console.log(err))


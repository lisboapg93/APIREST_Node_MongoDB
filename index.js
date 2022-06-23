const express = require('express')
const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())


app.get('/', (req, res) => {


    res.json({message: 'Oi, esta funcionando!'})
})

const DB_USER = 'pedro'
const DB_PASSWORD = encodeURIComponent('123789')


mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.mb0mysv.mongodb.net/?retryWrites=true&w=majority`,
)
.then(() => {
    console.log('Conectamos ao mongo!')
    app.listen(3000)
})
.catch((err) => console.log(err))

app.listen(3000)

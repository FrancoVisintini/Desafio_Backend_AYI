const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const routerProducts = require('./api/routes/ProductRoutes')
const routerUsers = require('./api/routes/UserRoutes')
const routerSales = require('./api/routes/SaleRoutes')
const data_charger = require('./api/controllers/DataController')



dotenv.config()


const app = express()
const {PORT} = process.env

// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//routes
app.use('/products', routerProducts)
app.use('/users', routerUsers)
app.use('/sales', routerSales)
app.use('/data', data_charger)
app.use('/*', (req,res)=>{
    res.status(404).send('endpoint does not exists')
})



mongoose.connect("mongodb://localhost:27017/challenge_db")
.then(res => {
    console.log('now connected to database')

    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`)
    })
})
.catch(err =>{
    console.log(err)
})

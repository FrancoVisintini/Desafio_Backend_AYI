const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const routerProducts = require('./api/routes/ProductRoutes')
dotenv.config()


const app = express()
const {PORT} = process.env

// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//routes
app.use('/products', routerProducts)



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

import express from "express";
import mongoose from "mongoose";
import api from './Router/api.js'
import morgan from "morgan";
import cors from 'cors'

const app = express()

// for post req 
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost/cordova', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
}).then((res) => { console.log('Mongo DB connected') }).catch(error => console.log("mongo connection error", error));

app.use('/api', api)

app.use(morgan('combined'))

// BaseURL
app.get('/', (req, res) => {
    return res.send('API Works')
})

app.listen(9999)

app.use(morgan('dev'))
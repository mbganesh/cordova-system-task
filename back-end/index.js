import express from "express";
import mongoose from "mongoose";
import api from './Router/api.js'
import morgan from "morgan";
import cors from 'cors'

const app = express()

// for post req 
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost/cordova')

app.use('/api', api)

app.use(morgan('combined'))


app.listen(9999)

app.use(morgan('dev'))

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const testController= require("./controllers/test")
const app = express();
app.use(express.json());
app.use(cors({ origin: process.env.FRONTEND_URL, methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'], credentials: true }));
app.enable('trust proxy')



app.use(testController)


module.exports = app;
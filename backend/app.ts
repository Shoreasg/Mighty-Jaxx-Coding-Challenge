const express = require('express');
const cors = require('cors');
require('dotenv').config();
const userController= require("./controllers/userController")
const productController = require("./controllers/productController")
const app = express();
app.use(express.json()); //built in middleware function in express. Parses incoming requests with json payload
app.use(cors({ origin: process.env.FRONTEND_URL, methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD', 'DELETE', 'PATCH'], credentials: true })); // cors middleware
app.enable('trust proxy')



app.use(userController);
app.use(productController);

module.exports = app;
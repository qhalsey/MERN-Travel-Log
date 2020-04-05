const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require('mongoose');
require('dotenv').config();

const middlewares = require('./middlewares.js');
const logs = require('./api/logs');

console.log(process.env.DATABASE_URL);
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});


const app = express();

//Import and setup middlewares
app.use(morgan("common"));
app.use(helmet());
app.use(cors({
    origin: process.env.CORS_ORIGIN
}));
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});

app.use('/api/logs', logs);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Listenting at http://localhost:${port}`);
});
const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");


const app = express();

//Import and setup middlewares
app.use(morgan("common"));
app.use(helmet());
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.get("/", (req, res) => {
    res.json({
        message: 'Hello World!'
    });
});

app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
});

//If this is hit because another route threw an error the status code will be 200. If it doesn't then setting the status code to 500 which means internal server error.
app.use((error, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: error.message,
        stack: process.env.NODE_ENV == 'production' ? "You ain't seeing the stack track bruh" : error.stack
    });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Listenting at http://localhost:${port}`);
});
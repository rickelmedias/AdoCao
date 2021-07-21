const morgan     = require('morgan');
const express    = require('express');
const bodyParser = require('body-parser');
const app        = express();

const routeAumigos = require('./routes/aumigos.js');

// Use:
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Pages:
app.use('/aumigos', routeAumigos);

// Page not found:
app.use((req, res, next) => {
    const error = new Error ('Error 404 Not Found');
    error.status = 404;
    next(error);
});

app.use( (error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            return: error.message
        }
    })
})

module.exports = app;
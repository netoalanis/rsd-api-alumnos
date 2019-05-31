const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//API
app.use('/alumnos', require('./api/alumnos'));
app.use('/clases', require('./api/clases'));
app.use('/alumnoclase', require('./api/alumnoclase'));

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

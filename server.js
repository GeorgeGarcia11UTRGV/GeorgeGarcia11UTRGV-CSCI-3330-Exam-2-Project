const express = require('express');
const path = require('path');
const coffeeRoutes = require('./routes/coffeeRoutes.js');
const { requestLogger, errorHandler } = require('./middleware/coffeeMiddleware.js');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(requestLogger);
app.use('/', coffeeRoutes);
app.use(errorHandler);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
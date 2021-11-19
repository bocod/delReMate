const express = require('express');
const app = express();
const path = require('path');
const router = require('./routers/mainRouter');

app.listen(process.env.PORT || 3000);


const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.set('view engine', 'ejs');

app.use('/', router);
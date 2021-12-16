const express = require('express');
const app = express();
const path = require('path');
const router = require('./routers/mainRouter');
const usersRouter = require('./routers/usersRouter');
const productRouter = require('./routers/productRouter');
const logMiddleware = require('./middlewares/logMiddleware');
const methodOverride = require('method-override');

app.listen(process.env.PORT || 3000, () => console.log('Server running'));


const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

app.use('/', router);
app.use('/users', usersRouter);
app.use('/products', productRouter);

app.use(logMiddleware);
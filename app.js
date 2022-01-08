const express = require('express');
const app = express();
const path = require('path');
const router = require('./routers/mainRouter');
const usersRouter = require('./routers/usersRouter');
const productRouter = require('./routers/productRouter');
const logMiddleware = require('./middlewares/logMiddleware');
const methodOverride = require('method-override');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const rememberCookieMiddleware = require('./middlewares/rememberCookieMiddleware');

const publicPath = path.resolve(__dirname, './public');

app.listen(process.env.PORT || 3000, () => console.log('Server running'));


app.use(express.static(publicPath));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cookieParser());
app.use(rememberCookieMiddleware);

app.use(logMiddleware);

app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

app.use( session({ 
    secret: 'DelReMate session process!!!',
    resave: false,
    saveUninitialized: false,
}) );


app.use('/', router);
app.use('/users', usersRouter);
app.use('/products', productRouter);

// Import modules
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const router = require('./routes/router');
const path = require('path');

// Set up database
const sequelize = require('./config/connection');
const { partial } = require('lodash');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Set up server
const app = express();
const PORT = process.env.PORT || 3000;

// Set up sessions with cookies
const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};
app.use(session(sess));

// Set up handlebars
const hbs = exphbs.create({
    extname: 'hbs',
    partialsDir: path.join(__dirname, 'views', 'partials')
});
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"css"))) // Set static folder for express

// Set up middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

// Start server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
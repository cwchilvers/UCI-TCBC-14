// Import modules
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const router = require('./routes/router');
const path = require('path');

// Set up database
const sequelize = require('./config/connection');
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

app
    .engine('hbs', hbs.engine)
    .set('view engine', 'hbs')
    .set('views', path.join(__dirname, "views"))
    .use(express.static(path.join(__dirname,"public"))); // Set static folder for express

// Set up middleware
app
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(router);

// Start server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
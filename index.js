const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const app = express();
const members = require('./Members');
const exphbs = require('express-handlebars');

//init middleware
//app.use(logger);

//Handle-bars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


//Body Parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Homepage route
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Member App',
        members
    });
});

//set Static folder
app.use(express.static(path.join(__dirname, 'public')))


//Members Api Routes
app.use('/api/members', require('./routes/api/members'));


const PORT = process.env.PORT || 5000;

//Listen port
app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});
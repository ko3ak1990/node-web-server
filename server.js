const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('viewengine', 'hbs');
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.use((req, res, next) => {
    const now = new Date().toDateString();
    const log = `time :${now} method:${req.method} url:${req.url}`;
    fs.appendFile('server.log', log + '\n', err => {
        if (err) {
            console.log('Unable to append to server log')
        }
    });
    console.log(log);
    next();
});
// app.use((req, res, next) => {
//     res.render('maintance.hbs')
// });
app.use(express.static(__dirname + '/public'));

app.get('/', (request, response) => {
    // response.send('<h1> Hello Express </h1>');
    response.render('home.hbs', {
        name: 'Ievgen',
        welcomeMsg: 'Android developer',
        pageTitle: "Home Page",
        currentYear: new Date().getFullYear()

    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: "About Page",
    })
});

app.listen(3000, () => {
    console.log('Server started');
});
const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const router = require('./router.js');

const expressHandlebars = require('express-handlebars');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const app = express();

app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));

app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

// load the handlebars engine
app.engine('handlebars', expressHandlebars({
  defaultLayout: '' // NOT using a main.handlebars layout file, which is kind of a "super template"
}));

app.set('view engine', 'handlebars'); // use the handlebars engine
app.set('views', `${__dirname}/../views`); // tell express where the .handlebars files are

router(app);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});


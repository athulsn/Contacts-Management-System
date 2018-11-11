var express = require('express');
var cors = require('cors');
var crudSetup = require('./controller/crudController');
var app = express();

app.set('view engine','ejs');
app.use(cors());
app.use('/assets', express.static('public'));

crudSetup(app);

app.listen(8085);
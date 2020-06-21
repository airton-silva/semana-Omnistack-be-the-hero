const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const {errors} = require('celebrate');

const app = express();

app.use(express.json());


var whitelist = ['http://127.0.0.1:3333']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(whitelist));


app.use(routes);

app.use(errors());


app.listen(3333);


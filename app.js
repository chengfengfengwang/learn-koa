const koa = require('koa');
const app = new koa();

const fs = require('fs');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
const exception = require('./middleware/exception.js');
const appManager = require('./core/init');

//require('./models/flow')
app.use(cors());
//异常处理
app.use(exception)
app.use(bodyParser());
appManager.init(app)


app.listen('3001')
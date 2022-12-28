const express = require('express');
require('dotenv').config();

const filesModule = require('./modules/files/index');

const app = express();
const port = process.env.APP_PORT;

app.use('/files', filesModule);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
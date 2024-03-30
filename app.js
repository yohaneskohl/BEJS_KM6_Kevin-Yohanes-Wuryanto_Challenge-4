const express = require('express');
const app = express();
const port = 8000;

app.use(express.json());

const v1 = require('./routes/v1/index');
app.use('/v1', v1);

app.listen(port, ()=>{
    console.log(`Running on port ${port}`);
});
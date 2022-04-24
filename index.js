//1-3
const express = require('express');
const app = express();
const port = process.env.PROT || 5000;


//4
app.get('/', (req, res) => {
    res.send('Running my Node CRUD Server')
});


//5
app.listen(port, () => {
    console.log('CRUD Server is Running');
})
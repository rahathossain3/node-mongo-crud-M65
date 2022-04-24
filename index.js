//1-3
const express = require('express');
const cors = require('cors'); // for cors
const app = express();
const port = process.env.PROT || 5000;


//use middleware
app.use(cors());
app.use(express.json());


//4
app.get('/', (req, res) => {
    res.send('Running my Node CRUD Server')
});


//5
app.listen(port, () => {
    console.log('CRUD Server is Running');
})
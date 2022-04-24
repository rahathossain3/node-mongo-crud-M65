//1-3
const express = require('express');
const cors = require('cors'); // for cors
const { MongoClient, ServerApiVersion } = require('mongodb');   //mongodb

const app = express();
const port = process.env.PROT || 5000;


//use middleware
app.use(cors());
app.use(express.json());



// user: dbuser1
// password: TQ5NJyagnGzgDnfn

//mongodb codes----------------



const uri = "mongodb+srv://dbuser1:TQ5NJyagnGzgDnfn@cluster0.mdrpi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
    const collection = client.db("foodExpress").collection("users");
    console.log('db connected');
    // perform actions on the collection object
    client.close();
});






//4
app.get('/', (req, res) => {
    res.send('Running my Node CRUD Server')
});


//5
app.listen(port, () => {
    console.log('CRUD Server is Running');
})
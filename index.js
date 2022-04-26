//1-3
const express = require('express');
const cors = require('cors'); // for cors
const { MongoClient, ServerApiVersion } = require('mongodb');   //mongodb

const ObjectId = require('mongodb').ObjectId;   // use for delete

const app = express();
const port = process.env.PROT || 5000;


//use middleware  { for post important too}
app.use(cors());
app.use(express.json());


// user: dbuser1
// password: TQ5NJyagnGzgDnfn

//mongodb codes start---------------------------------------------------


const uri = "mongodb+srv://dbuser1:TQ5NJyagnGzgDnfn@cluster0.mdrpi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// send data function 
async function run() {

    try {
        await client.connect();
        const userCollection = client.db("foodExpress").collection("user");

        // data load / get user-------------------------********
        app.get('/user', async (req, res) => {
            const query = {};

            const cursor = userCollection.find(query);

            const users = await cursor.toArray();
            res.send(users)

        })

        // update a single user------------------------*******

        app.get('/user/:id', async (req, res) => {
            // get selected id 
            const id = req.params.id;

            //set selected id for update action
            const query = { _id: ObjectId(id) };
            // set data all user_property(variable)
            const result = await userCollection.findOne(query);
            res.send(result);
        })



        // post a data-----(get data from client side)-***************************************
        // POST user: add a new user
        app.post('/user', async (req, res) => {

            const newUser = req.body;
            console.log('adding new user', newUser);

            const result = await userCollection.insertOne(newUser);

            //json structure return
            // res.send({ result: 'success' })     
            res.send(result)
        });


        // for update user info ----------------------********
        app.put('/user/:id', async (req, res) => {
            const id = req.params.id;
            const updatedUser = req.body;
            const filter = { _id: Object(id) };

            const options = { upsert: true };

            const updatedDoc = {
                // way 1
                // $set:req.body;

                //way 2
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email
                }
            };
            const result = await userCollection.updateOne(filter, updatedDoc, options);

            res.send(result);

        })


        //delete  user------------------------------------*******
        app.delete('/user/:id', async (req, res) => {

            const id = req.params.id;
            const query = { _id: ObjectId(id) };

            const result = await userCollection.deleteOne(query);
            res.send(result);

        })



        /* const user = { name: 'monona nodi', email: 'mohonanodi@gmail.com' };
        const result = await userCollection.insertOne(user);
        console.log(`user inserted  with id ${result.insertedId}`) */
    }
    finally {
        // continue database use korle  client.close() use kora jaba na
        // await client.close();
    }

}

// call function 
run().catch(console.dir);


//mongodb codes End------------------------------------------------------------


//4
app.get('/', (req, res) => {
    res.send('Running my Node CRUD Server')
});


//5
app.listen(port, () => {
    console.log('CRUD Server is Running');
})
const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ofy9u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
    try{
         await client.connect();
        const database = client.db('onlineShop');
        const serviceCollection = database.collection('services');

        //Get Api
        app.get('/services', async(req, res) =>{
         const cursor = serviceCollection.find({});
         const services = await cursor.toArray();
         res.send(services);
        })
    }
    finally{
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) =>{
    res.send("server running")
});

app.listen(port, () =>{
    console.log("server running at port", port);
})
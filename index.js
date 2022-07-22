const express = require('express');
const app = express();
const cors = require('cors');
const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
const dotenv = require('dotenv').config();
const URL = process.env.DB;

//middleware
app.use(express.json())

//cors origin setup
app.use(cors({
    origin: 'https://shimmering-bombolone-d376b1.netlify.app'
}))


app.get('/students', async (request, response) => {
    try {
        //open the connection
        let connection = await mongoClient.connect(URL);

        //select the DB
        let db = connection.db('demo_students');

        //select the collection and do opreations
        let getData = await db.collection('students').find().toArray();

        //close the connection
        connection.close();

        response.json(getData);

    } catch (error) {
        alert('ERROR!')
    }
})

app.post('/student', async (request, response) => {
    try {
        // open the connection
        let connection = await mongoClient.connect(URL);

        //select the DB
        let db = connection.db('demo_students');

        //select the connection and do operations
        await db.collection('students').insertOne(request.body);

        //close the connection
        connection.close();

        response.json({
            message: 'Student added!'
        })
    } catch (error) {
        alert('ERROR!')
    }
})

app.get('/student/:id', async (request, response) => {
    try {
        //open the connection
        let connection = await mongoClient.connect(URL);

        //select the DB
        let db = connection.db('demo_students');

        //select the collection and do opreations
        let getOneData = await db.collection('students').findOne({ _id: mongodb.ObjectId(request.params.id) });

        //close the connection
        connection.close();

        response.json(getOneData)
    } catch (error) {
        alert('ERROR!')
    }
})

app.put('/student/:id', async (request, response) => {
    try {
        //open the connection
        let connection = await mongoClient.connect(URL);

        //select the DB
        let db = connection.db('demo_students');

        //select the collection and do opreations
        let updateOneData = await db.collection('students').updateOne({ _id: mongodb.ObjectId(request.params.id) }, { $set: request.body });

        //close the connection
        connection.close();

        response.json({
            message: 'Updated successfully!'
        })
    } catch (error) {
        alert('ERROR!')
    }
})

app.delete('/student/:id', async (request, response) => {
    try {
        //open the connection
        let connection = await mongoClient.connect(URL);

        //select the DB
        let db = connection.db('demo_students');

        //select the collection and do opreations
        await db.collection('students').deleteOne({ _id: mongodb.ObjectId(request.params.id) })

        //close the collection
        connection.close();

        response.json({
            message: 'student deleted!'
        })
    } catch (error) {
        alert('ERROR!')
    }
})

app.listen(process.env.PORT || 6999);
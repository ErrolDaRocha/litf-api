'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require("mongodb").MongoClient;

const CONNECTION_URL = process.env.DATABASE;
const DATABASE_NAME = "beonaiunddce852";
const COLLECTION_NAME = "Resources";

//console.log(process.env)

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// http://localhost:8080/animallist/Acadia

app.get("/animallist/:schoolname", (request, response) => {

    console.log(request.params.schoolname);
    collection.findOne({"type" : "animallist", "school" : request.params.schoolname}, (error, result) => {

        if (error) {
            return response.status(500).send(error);
        } else if (result) {
            console.log("sending animal list data back!!!");
            response.send(result);
        } else {
            return response.status(500).send({ 'error':'school not found'});
        }
    });
})

// http://localhost:8080/resourcelist/Acadia

app.get("/resourcelist/:schoolname", (request, response) => {

    console.log(request.params.schoolname);
    collection.findOne({"type" : "resourcelist", "school" : request.params.schoolname}, (error, result) => {

        if (error) {
            return response.status(500).send(error);
        } else if (result) {
            console.log("sending resource list data back!!!");
            response.send(result);
        } else {
            return response.status(500).send({ 'error':'school not found'});
        }

    });

})

var database, collection;

app.listen(8080, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
        if(error) {
            throw error;
        }

        database = client.db(DATABASE_NAME);
        collection = database.collection(COLLECTION_NAME);

        console.log("Running on port 8080 - connected to `" + DATABASE_NAME + "`");
    });
});
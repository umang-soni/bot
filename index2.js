const { Client, RemoteAuth } = require('whatsapp-web.js');

// Require database
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');

// Load the session data
mongoose.connect("mongodb+srv://krishana993677601:umang9936@cluster0.79elcim.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => {
    console.log("database connected successfully")
    const store = new MongoStore({ mongoose: mongoose });
    const client = new Client({
        authStrategy: new RemoteAuth({
            store: store,
            backupSyncIntervalMs: 300000
        })
    })

    client.initialize();
})
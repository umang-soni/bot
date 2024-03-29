const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const express=require("express")
const app= express();
const port=process.env.PORT||5000;

const whatsapp = new Client({
    authStrategy: new LocalAuth(),
});

let isInitialized = false; // Flag to track initialization status

whatsapp.on('qr', qr => {
    qrcode.generate(qr, { small: true });
    console.log("Scan the QR code above with your phone's WhatsApp.");
});

whatsapp.on('ready', () => {
    console.log("Client is ready");
});
whatsapp.on('message', async message => {
    console.log('Message received:', message.body);
    if (message.body === 'hello') {
        console.log('Received hello message');
        console.log(message)
        message.reply("hi....this is chat bot");
    }
});


whatsapp.on('authenticated', (session) => {
    console.log('Authenticated');
    // You can save the session object to reuse the authentication
});

whatsapp.on('auth_failure', (msg) => {
    console.error('Authentication failed', msg);
});

whatsapp.on('disconnected', (reason) => {
    console.log('Disconnected:', reason);
    // Handle reconnection here if needed
});

// Initialize WhatsApp client if not already initialized
if (!isInitialized) {
    whatsapp.initialize()
        .then(() => {
            isInitialized = true;
        })
        .catch(err => {
            console.error('Initialization error:', err);
        });
}
app.listen(port);


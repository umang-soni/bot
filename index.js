const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
require('dotenv').config();

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


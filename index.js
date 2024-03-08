const fs = require('fs');
const qrcode = require('qrcode');
const { Client, LocalAuth } = require('whatsapp-web.js');
require('dotenv').config();

const whatsapp = new Client({
    authStrategy: new LocalAuth(),
});

let isInitialized = false; // Flag to track initialization status

whatsapp.on('qr', async qr => {
    try {
        const qrCodeImage = await qrcode.toDataURL(qr);
        console.log("Scan the QR code above with your phone's WhatsApp.");
        console.log(qr); // Print the QR code to console (optional)
        // Save the QR code image to a file (optional)
        fs.writeFileSync('qrcode.png', qrCodeImage.split(';base64,').pop(), { encoding: 'base64' });
    } catch (error) {
        console.error('Error generating QR code:', error);
    }
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



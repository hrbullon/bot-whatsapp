const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const { Buttons } = require('whatsapp-web.js/src/structures');
let client;

const startBot = () => {

    client = new Client({
        authStrategy: new LocalAuth()
    });
    
    client.on('qr', qr => {
        qrcode.generate(qr, {small: true});
    });
    
    client.on('ready', () => {
        console.log('Client is ready!');
        listenMessage();
        console.log("Listening messages");
    });
    
    client.initialize();
}

const listenMessage = () => {
    
    client.on('message', message => {
        
        const { from, to, body } = message;
        
        switch (body) {
            case "hola":
                sendMessage(from, "Bienvenido!!");
            break;
            case "imagen":
                sendMedia(from, "node.jpg");
            break;
            case "boton":
                let botones = new Buttons("Opciones", [{body:'button1'},{body:'button2'},{body:'button3'},{body:'button4'}]);
                console.log("Btn star");
                sendMessage(from, botones);
                console.log("Btn end");
                message.reply(botones);
                console.log(`⚡⚡⚡ Enviando mensajes....`);
            break;
        }
    });
}

const sendMedia = (to, file) => {
    const mediaFile = MessageMedia.fromFilePath(`./media/${file}`);
    client.sendMessage(to, mediaFile);
}

const sendMessage = (to, message) => {
    client.sendMessage(to, message);
}


startBot();
 
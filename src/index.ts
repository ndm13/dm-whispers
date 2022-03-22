import 'dotenv/config';
import {Client, Intents} from "discord.js";
import {WebSocketServer} from 'ws';

const client = new Client({
    intents: [ Intents.FLAGS.DIRECT_MESSAGES ],
    partials: [ 'CHANNEL' ],
    presence: {
        status: 'idle',
        activities: [ { type: 'LISTENING', name: "your DMs" } ]
    }
});
client.once('ready', () => console.log("[Discord.js] Client ready"));
client.login(process.env.DISCORD_TOKEN)
    .then(() => console.log("[Discord.js] Authenticated"))
    .catch(e => console.log("[Discord.js] Authentication failed:", e));

client.on('error', error => console.error(error));

const server = new WebSocketServer({ port: 8080 });
server.once('listening', () => console.log("[WebSocket ] Server ready"));

const users = {};
server.on('connection', socket => {
    console.log("[WebSocket ] Connection established");
    client.on('messageCreate', message => {
        if (message.author.id === client.application.id) return;
        console.log("[Discord.js] [" + message.author.id + "]", message.content);
        users["" + message.author.id] = message.author;
        socket.send(JSON.stringify({
            id: "" + message.author.id,
            name: message.author.username,
            message: message.content
        }));
    });
    socket.on('message', message => {
        let data = JSON.parse(message.toString());
        console.log("[WebSocket ] [" + data.id + "]", data.message);
        users[data.id].send(data.message);
    });
    socket.on('close', () => {
        console.log("[WebSocket ] Connection closed");
        client.removeAllListeners('messageCreate');
    })
});
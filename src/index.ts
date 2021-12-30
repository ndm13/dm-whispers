import {Client, Intents} from 'discord.js';
import {discord} from './secrets.json';
const client = new Client({
    intents: [ Intents.FLAGS.DIRECT_MESSAGES ],
    partials: [ 'CHANNEL' ],
    presence: {
        status: "idle",
        activities: [ { type: "LISTENING", name: "your DMs" } ]
    }
});
client.once('ready', () => console.log('[Discord.js] Client ready'));
client.login(discord.token)
    .then(() => console.log('[Discord.js] Authenticated'))
    .catch(e => console.log('[Discord.js] Authentication failed:', e));

client.on("error", error => console.error(error));

client.on("messageCreate", message => {
    console.log(message.author.username, "says:", message.content);
});

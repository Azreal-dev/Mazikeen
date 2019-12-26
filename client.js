require('dotenv').config(); 

const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');
const Log = require('./Logs/Index');

const client = new Discord.Client({
    disableEveryone: true
});

client.needMP = new Map();

fs.readdir(path.join(__dirname, 'Events', 'Basics'), (err, files) => {
    if (err) return new Log().err(err.stack);

    if (files.length > 0) new Log().load(`Chargement de ${files.length} évènements basique`);
    else return new Log().warn('Aucun évènement basque trouvé.');

    files.forEach((f) => {
        const events = require(path.join(__dirname, 'Events', 'Basics', f));
        const event = f.split('.')[0];

        delete require.cache[require.resolve(path.join(__dirname, 'Events', 'Basics', f))];
        client.on(event, events.bind(null, client));
    });
});

fs.readdir(path.join(__dirname, 'Events', 'Options'), (err, files) => {
    if (err) return new Log().err(err.stack);

    if (files.length > 0) new Log().load(`Chargement de ${files.length} évènements optionnels`);
    else return new Log().warn('Aucun évènement optionnel trouvé.');

    files.forEach((f) => {
        const events = require(path.join(__dirname, 'Events', 'Options', f));
        const event = f.split('.')[0];

        delete require.cache[require.resolve(path.join(__dirname, 'Events', 'Options', f))];
        client.on(event, events.bind(null, client));
    });
});

const cmd_path = {
    main: path.join(__dirname, 'Commands', 'Main')
};

client.commandsMain = new Discord.Collection();
fs.readdir(cmd_path.main, (err,  files) => {
    if (err) return new Log().err(err.stack);

    let cmd = files.filter(f => f.split(".").pop() === "js");

    if (cmd.length === 0) return new Log().warn('Aucune commande générale détecté.');
    new Log().load(`Chargement de ${cmd.length} commandes générales.`);
    
    cmd.map(async (f) => {
        await delete require.cache[require.resolve(`${cmd_path.main}/${f}`)];
        let props = require(`${cmd_path.main}/${f}`);
        
        client.commandsMain.set(props.info.name, props);
    });
});

client.login(process.env.CLIENT_TOKEN);
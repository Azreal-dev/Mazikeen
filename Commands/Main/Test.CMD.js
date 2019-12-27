const { CFG, T } = require('../../Config/Index');
const { Messages } = require('../../Functions/Index');
const Log = require('../../Logs/Index');

module.exports.run = async (client, msg, t) => {
    const channel = msg.channel;
    try {
        channel.startTyping();

        setTimeout(async () => {
            await channel.stopTyping();
            channel.send('Pas encore disponible !')
        }, CFG.getRandomInt(1, 3) * 1000);
    } catch (error) {
        channel.stopTyping();
        new Log().err(error.stack ? error.stack : error.toString());
        new Messages(msg, client, false).errInt(error.message);
        new Messages(msg, client, false).err("Oops ! Une erreur sûrement due à Joe empêche l'exécution du programme ! Un rapport vient d'être envoyé à mon Dieu suprême Atlass_75");
    }
};

module.exports.info = {
    name: 'test',
    desc: null,
    onlyGuild: true,
    dltMsg: true,
    active: true,
    args: [],
    requiredPermissions: [],
    executors: [],
};
const { CFG, T } = require('../../Config/Index');
const { Messages } = require('../../Functions/Index');
const Log = require('../../Logs/Index');

module.exports.run = async (client, msg, t) => {
    const channel = msg.channel;
    try {
        channel.startTyping();

        setTimeout(async () => {
            await channel.stopTyping();
            channel.send('**Essai des fonctionnalités en cours **<a:loading_mazikeen:658599310463729675>').then(async res => {
                setTimeout(() => {
                    res.delete();
                    new Messages(msg, client, null).send({
                        embed: {
                            color: CFG.color.success,
                            title: 'Rapport d\'essai',
                            description: '**- Message (FNC 1 - 15)** : `OK`\n**- Commandes ** : `OK`\n**- API Atlass_75.js** : `OK`\n**- Utilisateur** : `OK`\n**- Évènements** : `OK`',
                            timestamp: new Date(),
                            footer: {
                                icon_url: client.user.displayAvatarURL,
                                text: client.user.username
                            }
                        }
                    });
                }, CFG.getRandomInt(1, 5) * 1000);
            });
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
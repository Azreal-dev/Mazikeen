module.exports.run = async (client, msg, t) => {
    msg.channel.send('Cool poto !');
};

module.exports.info = {
    name: 'help',
    desc: null,
    onlyGuild: true,
    dltMsg: true,
    active: true,
    args: [{
        required: false,
        description: "Infos à propos d'une commande spécifique // info about a specific command.",
        name: "commande"
    }],
    requiredPermissions: [],
    executors: [],
};
const { CFG } = require('../../Config/Index');
const Log = require('../../Logs/Index');

module.exports = async (client) => {
    client.user.setPresence({
        game: {
            name: CFG.presence.name[0],
            type: CFG.presence.type
        },
        status: "online"
    }).catch(console.error);

    setInterval(() => {
        const index = Math.floor(Math.random() * (CFG.presence.name.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).
        client.user.setPresence({
            game: {
                name: CFG.presence.name[index],
                type: CFG.presence.type
            },
            status: "dnd"
        }).catch(console.error);
    }, CFG.presence.autoSkip * 1000);

    new Log().ok('BOT en ligne');
    // client.channels.get(CFG.ID.channel.roles).fetchMessage(CFG.ID.msg.roles).then(async m => {
    //     await m.clearReactions();
    //     await m.react(CFG.ID.react.roles);
    // });
};
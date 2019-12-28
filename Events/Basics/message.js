const { CFG, T } = require('../../Config/Index');
const Log = require('../../Logs/Index');
const { Messages } = require('../../Functions/Index');

module.exports = async (client, msg) => {
    if (msg.author.bot) return;

    try {
        const prefix = CFG.prefix;
        const content = msg.content.toLowerCase();
        if (content.includes("es tu là mazikeen") {
            msg.react("✅");
            return msg.reply("Oui, je suis là ☺");
        }
        if (content.includes('je t\'aime mazikeen')) {
            if (CFG.love.blacklist.find(id => id === msg.author.id)) new Messages(msg, client, false).send('T\'es qui toi connard ? :middle_finger:');
            else if (CFG.love.whitlist.find(id => id=== msg.author.id)) new Messages(msg, client, null).send('Je t\'aime aussi mon ange déchu :heart:');
            else new Messages(msg, client, null).send(':face_with_raised_eyebrow:');
        }
        if (!content.startsWith(prefix)) return;
        const cmd = content.slice(prefix.length).trim().split(' ').shift().toLowerCase();
        msg.args = content.split(' ').splice(1);

        let main = client.commandsMain.get(cmd);

        try {
            if (main) {
                if (!main.info.active) return new Messages(msg, client, null).err(T.msg.err.CMD_DISBLD);
                else if (main.info.onlyGuild && msg.channel.type === "dm") return new Messages(msg, client, null).err(T.msg.err.NOT_ALLOWED_PM);
                else if (main.info.executors.length > 0 && main.info.executors.includes(msg.author.id)) return new Messages(msg, client, null).err(T.msg.err.USR_CMD_BANNED);
                else if (main.info.requiredPermissions.length > 0 && !main.info.requiredPermissions.some(v => msg.member.hasPermission(v.toUpperCase()))) return new Messages(msg, client, null).err(T.msg.err.USR_DONT_HAVE_PERM_TO_USE);

                const R_args = main.info.args.filter(r => r.required);
                if (msg.args.length < R_args.length) return new Messages(msg, client, null).err(T.msg.err.NEED_ARGS(msg.args.length, R_args.length));
                
                main.run(client, msg);

                if (main.info.dltMsg) msg.delete();
            } else new Messages(msg, client, null).err(T.msg.err.CMD_404);
        } catch (err) {
            new Log().err(err.stack ? err.stack : err.toString());
        }
    } catch (err) {
        new Log().err(err.stack ? err.stack : err.toString());
    }
};

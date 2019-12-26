const { CFG, T } = require('../Config/Index');
const Log = require('../Logs/Index');

class Message {
    constructor(msg, client, channel) {
        this.msg = msg;
        this.client = client;
        this.channel = this.msg.channel ? this.msg.channel : channel;
        this.c_user = this.client.user;
    }

    send (message, AutoDelete) {
        try {
            this.channel.startTyping();

            setTimeout(async () => {
                await this.channel.stopTyping();
                this.channel.send(message).then(res => { if (AutoDelete && typeof AutoDelete === 'number') res.delete(AutoDelete) });
            }, CFG.getRandomInt(1, 3) * 1000);
        } catch (error) {
            Log.err(error.stack ? error.stack : error.toString());
        }
    }

    err (message) {
        return this.send({
            embed: {
                color: CFG.color.danger,
                title: T.title.err,
                description: message,
                timestamp: new Date(),
                footer: {
                    icon_url: this.c_user.displayAvatarURL,
                    text: this.c_user.username
                }
            }
        });
    }

    errInt (err_console) {
        return this.msg.guild.channels.get('658605879549231105').send({
            embed: {
                color: CFG.color.danger,
                title: ':no_entry: Erreur :no_entry:',
                description: `__**Salon :**__ <#${this.channel.id}> | __**Utilisateur :**__ ${this.channel.guild.members.get(this.msg.author.id).nickname ? this.channel.guild.members.get(this.msg.author.id).nickname : this.msg.author.username}`,
                fields: [{
                    name: '**Erreur console**',
                    value: ` \`\`\`${err_console}\`\`\``
                }],
                timestamp: new Date(),
                footer: {
                    icon_url: this.client.user.displayAvatarURL,
                    text: this.client.user.username
                }
            }
        });
    }
}

module.exports = Message;
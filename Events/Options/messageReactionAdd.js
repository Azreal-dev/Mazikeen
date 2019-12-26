const { CFG, T } = require('../../Config/Index');
const Log = require('../../Logs/Index');
const { Messages } = require('../../Functions/Index');

module.exports = async (client, reaction, user) => {
    if (user.bot) return;
    let tempMP = [];

    // Règle lu
    if (reaction.message.id === CFG.ID.msg.regles) {
        if (reaction.emoji.name === CFG.ID.react.regles) {
            reaction.message.guild.member(user).addRole(CFG.ID.roles.regle_lu).catch(console.error);
        }
    }

    // Demande de rôle
    if (reaction.message.id === CFG.ID.msg.roles) {
        await reaction.message.reactions.forEach(r => r.remove(user.id));
        if (reaction.emoji.id === CFG.ID.react.roles) {
            try {
                user.send({
                    embed: {
                        color: CFG.color.default,
                        title: T.title.roles,
                        description: T.msg.role.q1
                    }
                }).then(async res => {
                    if (tempMP[user.id]) {
                        if (!tempMP[user.id].send) tempMP[user.id].send = true;
                        console.log(tempMP[user.id].send)
                    }

                    const em = ['✅', '❌'];
                    for (const i in em) await res.react(em[i]);

                    let filter = (reaction, user2) => user2.id === user.id;

                    const collector = res.createReactionCollector(filter, {
                        time: CFG.MSG.collector,
                        max: 1
                    });

                    collector.on('collect', async (reac, reactionCollector) => {
                        const emoji = reac.emoji.name;
                        const channel = reac.message.channel;

                        switch (emoji) {
                            case '✅':
                                channel.startTyping();

                                setTimeout(async () => {
                                    await channel.stopTyping();
                                    channel.send({
                                        embed: {
                                            color: CFG.color.secondary,
                                            title: T.title.roles_dev,
                                            description: T.msg.role.q2
                                        }
                                    }).then(res => {
                                        res.channel.awaitMessages(response => response.content, {
                                            max: 1,
                                            time: 300000,
                                            errors: ['time'],
                                        }).then(async (collected) => {
                                            const rp = collected.first().content.toLowerCase();
                                            const roles = rp.split(';');
                                            let attribR = [];
                                            channel.startTyping();
                                            setTimeout(async () => {
                                                await channel.stopTyping();
                                                for (const i in roles) {
                                                    let ro = roles[i];
                                                    for (const rF in CFG.rolesA.dev) {
                                                        let rP = CFG.rolesA.dev[rF]
                                                        if (ro.includes(rP.name.toLowerCase())) {
                                                            attribR.push(`- ${rP.name}`)
                                                            reaction.message.guild.member(user).addRole(rP.id).catch(console.error);
                                                        };
                                                    };
                                                };
                                                reaction.message.guild.member(user).addRole(user).addRole(CFG.rolesA.def.dev).catch(console.error);
                                                channel.send(`Je vous ai attribué les rôles :\n${attribR.join('\n')}`);
                                            }, CFG.getRandomInt(1, 3) * 1000);
                                        });
                                    }).catch(e => {
                                        if (e.message.includes('Cannot send messages to this user')) return needMp();
                                        new Log().err(e.stack ? e.stack : e.toSting());
                                    });
                                }, CFG.getRandomInt(1, 3) * 1000);
                                break;

                            case '❌':
                                channel.startTyping();

                                setTimeout(async () => {
                                    await channel.stopTyping();
                                    channel.send({
                                        color: CFG.color.secondary,
                                        title: T.title.roles,
                                        description: T.msg.role.q3
                                    }).then(async res2 => {
                                        for (const i in em) await res2.react(em[i]);

                                        collector.on('collect', async (reac, reactionCollector) => {
                                            const emoji = reac.emoji.name;
                                            const channel = reac.message.channel;

                                            switch (emoji) {
                                                case '✅':
                                                    
                                                    break;
                                            
                                                default:
                                                    new Messages(false, client, reac.message.channel).send({
                                                        embed: {
                                                            color: CFG.color.danger,
                                                            title: T.title.err,
                                                            description: T.msg.err.DONT_UNDERSTAND
                                                        }
                                                    });
                                                    break;
                                            }
                                        });
                                    }).catch(e => {
                                        if (e.message.includes('Cannot send messages to this user')) return needMp();
                                        new Log().err(e.stack ? e.stack : e.toSting());
                                    });
                                }, CFG.getRandomInt(1, 3) * 1000);
                                break;

                            default:
                                new Messages(false, client, reac.message.channel).send({
                                    embed: {
                                        color: CFG.color.danger,
                                        title: T.title.err,
                                        description: T.msg.err.DONT_UNDERSTAND
                                    }
                                });
                                break;
                        }
                    });

                    collector.on('end', () => {
                        res.delete();
                    });
                }).catch(e => {
                    if (e.message.includes('Cannot send messages to this user')) return needMp();
                    new Log().err(e.stack ? e.stack : e.toSting());
                });
            } catch (err) {
                if (err.message.includes('Cannot send messages to this user')) return needMp();
                new Log().err(err.stack ? err.stack : err.toSting());
            }
        }
    }

    async function needMp() {
        const mpC = client.channels.get(CFG.ID.channel.needMP);
        const User = reaction.message.guild.member(user);

        if (!tempMP.find(id => id == user.id)) tempMP.push({ [user.id]: { send: false } });
        console.log(tempMP);
        
        await mpC.overwritePermissions(User, {
            VIEW_CHANNEL: true
        });

        mpC.send(`<@${user.id}>`, {
            embed: {
                color: CFG.color.default,
                title: T.title.needMP,
                description: T.msg.err.MP(user.id),
                image: {
                    url: "https://imgur.com/USLaYIv.png"
                }
            }
        });
    }
}
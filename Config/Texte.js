const t = {
    title: {
        err: ":no_entry: | Erreur | :no_entry:",
        roles: "Rôles // roles",
        roles_dev: "Rôles développeur // Developer roles",
        needMP: "Message privé // Direct message",
    },

    msg: {
        loveMsg: [],
        err: {
            CMD_DISBLD: "Cette commande est désactivée ! :x: \n----\nThis command is disabled! :x:",
            NOT_ALLOWED_PM: ":x: | Vous ne pouvez utiliser cette commande en MP !\n----\n:x: | You can't execute this command in private message!",
            USR_CMD_BANNED: ":no_entry_sign: | Vous n'avez plus le droit d'utiliser cette commande !\n----\n:no_entry_sign: | You're no longer allowed to execute this command!",
            USR_DONT_HAVE_PERM_TO_USE: ":no_entry_sign: | Vous n'avez les permissions requis d'uiliser cette commande !\n----\n:no_entry_sign: | You're not allowed to execute this command!",
            NEED_ARGS: (give, needed) => `:x: | __**Argument non valides :**__ ${needed} argument.s sont nécessaires, vous en avez fournis ${give} !\n----\n:x: __**Invalid arguments:**__ ${needed} are needed but ${give} were provided.`,
            CMD_404: "Je n'ai pas trouver cette commande ! :confused:\n----\nI didn't find this command! :confused:",
            DONT_UNDERSTAND: "Désolé, mais je n'ai pas compris votre demande. // Sorry, but I don't understand your request.",
            MP: (id) => `<@!${id}>, pouvez vous activer temporairement vos MP ? Je dois vous envoyer un message privé. Si vous ne savez pas comment, voici un petit tuto.\n----\n<@${id}>, can you temporarily activate your PM? I need to send you a message. If you don't know how to do it, here's a little tutorial.`,
            REACT_404: (id) => `Calme toi <@${id}> ! arrête de mettre des trucs que je comprend pas ! Espèce de moula !`
        },
        role: {
            title: "Rôle ajouté",
            titleR: "Rôle retiré",
            msg: (user, roleID) => `GG <@${user}> ! Tu as maintenant le rôle <@&${roleID}> ainsi qu'aux salons qu'il propose.`,
            msgR: (user, roleID) => `OMG <@${user}> :scream: ! Tu n'as plus le rôle <@&${roleID}> ainsi qu'aux salons qu'il proposait.`
        }
    }
}

module.exports = t;
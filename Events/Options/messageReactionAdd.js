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
    if (reaction.message.id === CFG.ID.msg.games) {
        const gamesReact = CFG.ID.react.games;
        const gamesRoles = CFG.ID.roles.games;
        
        let roleID;
        let roleName;
        
        switch (reaction.emoji.name) {
            case gamesReact.csgo:
                roleID = gamesRoles.csgo;
                break;

            case gamesReact.SoT:
                roleID = gamesRoles.SoT;
                break;

            case gamesReact.GTA:
                roleID = gamesRoles.GTA;
                break;

            case gamesReact.RoE:
                roleID = gamesRoles.RoE;
                break;

            case gamesReact.Rust:
                roleID = gamesRoles.Rust;
                break;

            case gamesReact.BT:
                roleID = gamesRoles.BT;
                break;

            case gamesReact.Ark:
                roleID = gamesRoles.Ark;
                break;

            default:
                roleID = null;
                new Messages(false, client, reaction.message.channel).err(`Calme toi <@${user.id}> ! arrête de mettre des trucs que je comprend pas ! Espèce de moula !`)
                break;
        }
        reaction.message.guild.member(user).addRole(roleID).catch(console.error);
    }
}
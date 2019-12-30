const { CFG, T } = require('../../Config/Index');
const Log = require('../../Logs/Index');
const { Messages } = require('../../Functions/Index');

module.exports = async (client, reaction, user) => {
    if (user.bot) return;
    let tempMP = [];

    // Règle lu
    if (reaction.message.id === CFG.ID.msg.regles) {
        if (reaction.emoji.name === CFG.ID.react.regles) {
            reaction.message.guild.member(user).removeRole(CFG.ID.roles.regle_lu).catch(console.error);
        }
    };

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
                
            case gamesReact.Golf:
                roleID = gamesRoles.Golf;
                break; 

            default:
                roleID = null;
                new Messages(false, client, reaction.message.channel).err(T.msg.err.REACT_404(user.id));
                break;
        }
        if (roleID) {
            reaction.message.guild.member(user).removeRole(roleID).catch(console.error);
            new Messages(false, client, reaction.message.channel).success({title: T.msg.role.titleR, msg: T.msg.role.msgR(user.id, roleID)});
        };
    }
}

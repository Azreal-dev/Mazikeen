const { randomBytes } = require('crypto');
const { RichEmbed } = require("discord.js");
const Jimp = require('jimp');
const Log = require('../../Logs/Index');
const { CFG } = require('../../Config/Index');

module.exports.run = async (client, msg) => {
    try {
        if (!CFG.channel.verify.includes(msg.channel.id)) return;
    
        if (!msg.args.length) {
            const captcha = await randomBytes(32).toString('hex').substr(0,6);
            const font = await Jimp.loadFont(Jimp.FONT_SANS_128_BLACK);
            const image = await Jimp.read('./Assets/Fond.jpg');
            
            await image.print(font, image.bitmap.width / 8, image.bitmap.height / 4, captcha);
            const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);
    
            const embed = new RichEmbed()
                .setTitle("Captcha")
                .setColor(CFG.color.warning)
                .attachFile({ attachment: buffer, name: "captcha.jpeg" })
                .setImage("attachment://captcha.jpeg")
                .setImage("attachment://captcha.jpeg");
            
            msg.channel.send(embed);
        }
        
    } catch (error) {
        console.log(error);
        
    }
};

module.exports.info = {
    name: 'verify',
    desc: null,
    onlyGuild: true,
    dltMsg: true,
    active: true,
    args: [{
        required: false,
        description: "",
        name: "veif" }],
    requiredPermissions: [],
    executors: [],
};
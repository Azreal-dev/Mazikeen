class config {
    constructor() {
        this.dev = true;

        this.prefix = '%';

        this.MSG = {
            autoDelete: 150000,
            collector: 1250000
        };

        this.love = {
            whitlist: ['303001662358945803', '424156869594972160', '290894080836108290', '448585921445625866', '306494061882114051'],
            blacklist: ['487507267684401153', '293039470398406657']
        };

        this.presence = {
            autoSkip: 5,
            name: ['', `${this.prefix}help`, 'Atlaaass 💖', 'Dembaaa 💖', 'Maliaaa 💖', 'Azraaaael 💖', 'Rydeeeer 💖', 'Joe me kiff 🤫'],
            type: 3
        };

        this.channel = {
            verify: ["628602654301487123", "647577063280214026"],
            log: {
                err: "658605879549231105"
            }
        };

        this.ID = {
            channel: {
                regles: "",
                roles: "",
                needMP: ""
            },
            react: {
                regles: "✅",
                games: {
                    csgo: "🔫",
                    SoT: "🏴‍☠️",
                    GTA: "🚙",
                    RoE: "🛡️",
                    Rust: "🟥",
                    BT: "🎲",
                    Ark: "🦕"
                }
            },
            msg: {
                regles: "652889587714359296",
                games: "659855366619660303"
            },
            roles: {
                regle_lu: "652881503763693576",
                games: {
                    csgo: "583749958478331921",
                    SoT: "649002257932615729",
                    GTA: "649003767563550772",
                    RoE: "573882791251410944",
                    Rust: "656547880085225482",
                    BT: "659906270156816425",
                    Ark: "570230684703260692"
                }
            }
        };

        this.rolesA = {
            def: {
                dev: "",
                game: ""
            },
            dev: [],
            gameing: []
        };

        this.color = {
            default: 0x23d6ff,      // Bleu
            secondary: 0x42f4a7,    // Vert claire
            danger: 0xff0000,       // Rouge
            success: 0x03db00,      // Vert
            warning: 0xffc107,      // Orange
            night: 0x002377,        // Bleu marine
            black: 0x000000,        // Noir
            white: 0xffffff,        // Blanc
            gray: 0xafafaf,         // Gris
            purpple: 0xb642ff,      // Violet
            join: 0x64C37D          // Couleur arrivé
        };
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
};

module.exports = new config;

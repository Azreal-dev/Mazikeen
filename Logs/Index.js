const moment = require('moment');
const path = require('path');
const fs = require('fs');
const colors = require('colors');

moment.locale('fr');

class logger {
    constructor() {

        // ==== En tête ==== //
        this.clsBG = colors.black.bgWhite(`\n --- [${new moment().format('DD/MM/YYYY à HH:mm:ss')}] --- \n`);
        this.loadBG = colors.black.bgMagenta(`\n --- [${new moment().format('DD/MM/YYYY à HH:mm:ss')}] --- \n`);
        this.mscBG = colors.black.bgBlue(`\n --- [${new moment().format('DD/MM/YYYY à HH:mm:ss')}] --- \n`);
        this.errBG = colors.black.bgRed(`\n --- [${new moment().format('DD/MM/YYYY à HH:mm:ss')}] --- \n`);
        this.okBG = colors.black.bgGreen(`\n --- [${new moment().format('DD/MM/YYYY à HH:mm:ss')}] --- \n`);
        this.warnBG = colors.black.bgYellow(`\n --- [${new moment().format('DD/MM/YYYY à HH:mm:ss')}] --- \n`);
        this.txtBG = `\n --- [${new moment().format('DD/MM/YYYY à HH:mm:ss')}] --- \n`;
        this.fileLog = `=========[${new moment().format('DD/MM/YYYY à HH:mm:ss')}]=========\n`;
        // ================= //

        // ==== Contenu ==== //
        this.c_warn = `${this.warnBG}${colors.yellow("[ATTENTION]")}${colors.cyan(" | ")}`;
        this.c_load = `${this.loadBG}${colors.magenta("[CHARGEMENT]")}${colors.cyan(" | ")}`;
        this.c_log = `${this.clsBG}${colors.white("[LOG]")}${colors.cyan(" | ")}`;
        this.c_error = `${this.errBG}${colors.red("[ERREUR]")}${colors.cyan(" | ")}`;
        this.c_ok = `${this.okBG}${colors.green("[OK]")}${colors.cyan(" | ")}`;
        this.c_txt = `${this.txtBG}`;
        this.c_msc = `${this.mscBG}${colors.blue("[MUSIQUE]")}${colors.cyan(" | ")}`;
        // ================= //

        // ==== Pied ==== //
        this.footCLS = '\n—————————————————————————————————';
        this.footERR = colors.red('\n—————————————————————————————————');
        this.footWARN = colors.yellow('\n—————————————————————————————————');
        this.footOK = colors.green('\n—————————————————————————————————');
        this.footLOAD = colors.magenta('\n—————————————————————————————————');
        this.fileFoot = '\n—————————————————————————————————————————\n\n';
        // ============== //

        this.itsBot = '*BOT MUSIQUE*\n'
    }

    log(message, musicBot = false) {
        try {
            if (!message) return this.err('Message manquant [Fichier log || LOG]');

            if (musicBot) message = this.itsBot + message;

            console.error(this.c_log + message + this.footCLS);

            fs.appendFileSync(path.join(__dirname, 'Files', 'LOG.log'), `${this.fileLog}${message}${this.fileFoot}`, { encoding: 'utf8' });
        } catch (error) {
            if (error) return this.err(error.stack)
        }
    }

    err(message, musicBot = false) {
        try {
            if (!message) return this.err('Message manquant [Fichier log || Erreur]');

            if (musicBot) message = this.itsBot + message;

            console.error(this.c_error + message + this.footERR);

            fs.appendFileSync(path.join(__dirname, 'Files', 'ERROR.log'), `${this.fileLog}${message}${this.fileFoot}`, { encoding: 'utf8' });
        } catch (error) {
            if (error) return this.err(error.stack)
        }
    }

    ok(message, musicBot = false) {
        try {
            if (!message) return this.err('Message manquant [Fichier log || Ok]');

            if (musicBot) message = this.itsBot + message;

            console.log(this.c_ok + message + this.footOK);

            fs.appendFileSync(path.join(__dirname, 'Files', 'OK.log'), `${this.fileLog}${message}${this.fileFoot}`, { encoding: 'utf8' });
        } catch (error) {
            if (error) return this.err(error.stack)
        }
    }

    warn(message, musicBot = false) {
        try {
            if (!message) return this.err('Message manquant [Fichier log || Warn]');

            if (musicBot) message = this.itsBot + message;

            console.warn(this.c_warn + message + this.footWARN);

            fs.appendFileSync(path.join(__dirname, 'Files', 'WARN.log'), `${this.fileLog}${message}${this.fileFoot}`, { encoding: 'utf8' });
        } catch (error) {
            if (error) return this.err(error.stack)
        }
    }

    load(message, musicBot = false) {
        try {
            if (!message) return this.err('Message manquant [Fichier log || Load]');

            if (musicBot) message = this.itsBot + message;

            console.log(this.c_load + message + this.footLOAD);

            fs.appendFileSync(path.join(__dirname, 'Files', 'LOAD.log'), `${this.fileLog}${message}${this.fileFoot}`, { encoding: 'utf8' });
        } catch (error) {
            if (error) return this.err(error.stack)
        }
    }
}

module.exports = logger;
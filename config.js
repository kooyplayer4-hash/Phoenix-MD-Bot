const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

// =========================
// 📁 LOAD ENVIRONMENT
// =========================

const envPath = path.join(__dirname, 'config.env');

if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
}

// =========================
// 🔧 HELPERS
// =========================

const toBool = (value, defaultValue = false) => {
    if (value === undefined || value === null || value === '') {
        return defaultValue;
    }

    if (typeof value === 'boolean') {
        return value;
    }

    return ['true', 'on', '1', 'yes'].includes(
        String(value).trim().toLowerCase()
    );
};

const toArray = (value, fallback = []) => {
    if (value === undefined || value === null || value === '') {
        return fallback;
    }

    if (Array.isArray(value)) {
        return value;
    }

    return String(value)
        .split(',')
        .map(item => item.trim())
        .filter(Boolean);
};

// =========================
// 🗄️ DATABASE
// =========================

const DATABASE_URL = (
    process.env.DATABASE_URL || './database.db'
).trim();

let DATABASE;

if (
    DATABASE_URL === './database.db' ||
    DATABASE_URL.startsWith('sqlite:')
) {
    DATABASE = new Sequelize({
        dialect: 'sqlite',
        storage: DATABASE_URL.replace(/^sqlite:/, ''),
        logging: false
    });
} else {
    DATABASE = new Sequelize(DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        logging: false,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    });
}

// =========================
// 🤖 BOT CONFIGURATION
// =========================

module.exports = {

    SESSION_ID:
        process.env.SESSION_ID || '',

    STICKER_DATA:
        process.env.STICKER_DATA ||
        '🎯ᴘʜᴏᴇɴɪx-ᴍᴅ;ᴀʙʜɪꜱʜᴇᴋ ꜱᴜʀᴇꜱʜ🍀',

    ALIVE_DATA:
        process.env.ALIVE_DATA ||
        '👋 ʜᴇʏ &sender, ɪ ᴍ *ᴘʜᴏᴇɴɪx-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ* ᴀʟɪᴠᴇ ɴᴏᴡ!\n\n' +
        '📌 ᴛʏᴘᴇ *menu* ᴛᴏ ɢᴇᴛ ᴍʏ ᴄᴏᴍᴍᴀɴᴅ ʟɪꜱᴛ.\n\n' +
        '*ᴘʟᴀᴛꜰᴏʀᴍ:* &platform\n' +
        '*ʀᴜɴᴛɪᴍᴇ:* &runtime\n' +
        'https://i.ibb.co/tHWJrz3/IMG-20231128-WA0005.jpg',

    AUDIO_DATA:
        process.env.AUDIO_DATA ||
        'Phoenix-MD;Abhishek Suresh;' +
        'https://i.ibb.co/tHWJrz3/IMG-20231128-WA0005.jpg',

    BOT_INFO:
        process.env.BOT_INFO ||
        'ᴘʜᴏᴇɴɪx-ᴍᴅ;ᴀʙʜɪꜱʜᴇᴋ ꜱᴜʀᴇꜱʜ;' +
        '919074692450;' +
        'https://i.ibb.co/tHWJrz3/IMG-20231128-WA0005.jpg',

    // Commands start with .
    PREFIX:
        process.env.PREFIX || '.',

    // PUBLIC MODE
    MODE:
        (
            process.env.MODE || 'public'
        ).trim().toLowerCase(),

    // Bot owner / SUDO numbers
    SUDO:
        toArray(
            process.env.SUDO,
            ['919074692450', '918157993101']
        ),

    // =========================
    // 📋 MENU
    // =========================

    MENU_DATA:
        process.env.MENU_DATA ||
        `╭━━━〔 🤖 PHOENIX-MD 〕━━━╮
┃
┃ 👋 Hello &sender
┃
┃ 📌 COMMANDS
┃
┃ • .menu
┃ • .alive
┃ • .ping
┃ • .sticker
┃ • .play
┃ • .download
┃
┃ ⚙️ Prefix: &prefix
┃ 🌐 Mode: &mode
┃
╰━━━━━━━━━━━━━━━━━━━━╯`,

    // =========================
    // 🌐 API
    // =========================

    API_ENABLED:
        toBool(
            process.env.API_ENABLED,
            true
        ),

    API_URL:
        (
            process.env.API_URL ||
            'https://abhi-api.vercel.app/'
        ).trim(),

    API_NUMBER:
        process.env.API_NUMBER || '',

    BASE_URL:
        (
            process.env.BASE_URL ||
            process.env.API_URL ||
            'https://abhi-api.vercel.app/'
        ).trim(),

    // =========================
    // 🔊 VOICE API
    // =========================

    ELEVENLABS_API_KEY:
        process.env.ELEVENLABS_API_KEY || '',

    // =========================
    // 🌍 LANGUAGE / TIME
    // =========================

    TIMEZONE:
        process.env.TIMEZONE ||
        'Europe/London',

    BOT_LANG:
        process.env.BOT_LANG ||
        'EN',

    // =========================
    // 🚀 STARTUP
    // =========================

    START_MSG:
        toBool(
            process.env.START_MSG,
            true
        ),

    ERROR_MSG:
        toBool(
            process.env.ERROR_MSG,
            true
        ),

    // =========================
    // 🛜 HOSTING
    // =========================

    HEROKU_APP_NAME:
        process.env.HEROKU_APP_NAME || '',

    HEROKU_API_KEY:
        process.env.HEROKU_API_KEY || '',

    RENDER_NAME:
        process.env.RENDER_NAME || '',

    RENDER_API:
        process.env.RENDER_API || '',

    KOYEB_APP_NAME:
        process.env.KOYEB_APP_NAME || '',

    KOYEB_API_KEY:
        process.env.KOYEB_API_KEY || '',

    // =========================
    // 🎯 AUTOMATION
    // =========================

    AUTO_ALWAYS_ONLINE:
        toBool(
            process.env.AUTO_ALWAYS_ONLINE,
            false
        ),

    AUTO_CALL_REJECT:
        toBool(
            process.env.AUTO_CALL_REJECT,
            false
        ),

    AUTO_CALL_REJECT_MSG:
        process.env.AUTO_CALL_REJECT_MSG ||
        '*ᴀᴜᴛᴏᴍᴀᴛᴇᴅ ᴄᴀʟʟ ʙʟᴏᴄᴋɪɴɢ*\n\n' +
        'ꜱᴏʀʀʏ ᴄᴀʟʟꜱ ᴀʀᴇ ɴᴏᴛ ᴀʟʟᴏᴡᴇᴅ\n\n' +
        'ᴘʟᴇᴀꜱᴇ ꜱᴇɴᴅ ᴀ ᴛᴇxᴛ ᴍᴇꜱꜱᴀɢᴇ/ᴠᴏɪᴄᴇ ᴍᴇꜱꜱᴀɢᴇ\n\n' +
        '> ᴘʜᴏᴇɴɪx-ᴍᴅ ᴡʜᴀᴛꜱᴀᴘᴘ ʙᴏᴛ',

    AUTO_MSG_READ:
        toBool(
            process.env.AUTO_MSG_READ,
            false
        ),

    AUTO_MSG_REACT:
        toBool(
            process.env.AUTO_MSG_REACT,
            false
        ),

    // =========================
    // 📱 STATUS
    // =========================

    AUTO_STATUS_SAVER:
        toBool(
            process.env.AUTO_STATUS_SAVER,
            false
        ),

    AUTO_STATUS_VIEW:
        toBool(
            process.env.AUTO_STATUS_VIEW,
            false
        ),

    AUTO_STATUS_REPLY:
        toBool(
            process.env.AUTO_STATUS_REPLY,
            false
        ),

    AUTO_STATUS_REPLY_MSG:
        process.env.AUTO_STATUS_REPLY_MSG ||
        '_*Nice Status Bro 🍀*_',

    AUTO_STATUS_REACT:
        toBool(
            process.env.AUTO_STATUS_REACT,
            false
        ),

    AUTO_STATUS_REACT_EMOJIS:
        toArray(
            process.env.AUTO_STATUS_REACT_EMOJIS,
            [
                '💎',
                '🤍',
                '🍀',
                '💀',
                '📈',
                '🎯',
                '🫶',
                '👀',
                '☠️'
            ]
        ),

    // =========================
    // ⚙️ OTHER
    // =========================

    BRANCH:
        process.env.BRANCH ||
        'main',

    DATABASE

};

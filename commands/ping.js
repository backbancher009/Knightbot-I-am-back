const settings = require('../settings.js');

function formatTime(seconds) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
}

async function pingCommand(sock, chatId, message) {
    try {
        const start = Date.now();

        const end = Date.now();
        const ping = end - start;

        const uptime = formatTime(process.uptime());

        const botInfo = `
╔═══════════════╗
   ⚡ 𝐙𝐀𝐇𝐈𝐃-𝐁𝐎𝐓 ⚡
╚═══════════════╝

🏓 Ping : ${ping} ms
⏳ Uptime : ${uptime}
🔖 Version : v${settings.version}

> 🤖 ${settings.botName}
`.trim();

        await sock.sendMessage(chatId, {
            text: botInfo
        }, { quoted: message });

    } catch (error) {
        console.error('Ping Error:', error);

        await sock.sendMessage(chatId, {
            text: '❌ Error getting status'
        }, { quoted: message });
    }
}

module.exports = pingCommand;

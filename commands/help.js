const settings = require('../settings');
const fs = require('fs');
const path = require('path');

async function helpCommand(sock, chatId, message) {

    const botName = settings.botName || '𝐙𝐀𝐇𝐈𝐃-𝐁𝐎𝐓';
    const version = settings.version || '3.0.0';
    const owner = settings.botOwner || '𝐙𝐀𝐇𝐈𝐃-𝐁𝐎𝐓';

    const helpMessage = `
╭━━━〔 🤖 ${botName} 〕━━━⬣
┃ ✦ Version : ${version}
┃ ✦ Owner   : ${owner}
┃ ✦ Status  : 🟢 Online
╰━━━━━━━━━━━━━━⬣

╭━━━〔 📌 GENERAL 〕━━━⬣
┃ ⬡ .help / .menu
┃ ⬡ .ping / .alive
┃ ⬡ .tts / .owner
┃ ⬡ .joke / .quote / .fact
┃ ⬡ .weather / .news
┃ ⬡ .lyrics / .8ball
┃ ⬡ .groupinfo / .admins
╰━━━━━━━━━━━━━━⬣

╭━━━〔 👑 ADMIN 〕━━━⬣
┃ ⬡ .ban / .kick
┃ ⬡ .promote / .demote
┃ ⬡ .mute / .unmute
┃ ⬡ .delete / .warn
┃ ⬡ .antilink / .antibadword
┃ ⬡ .tagall / .hidetag
┃ ⬡ .welcome / .goodbye
┃ ⬡ .setgname / .setgdesc
╰━━━━━━━━━━━━━━⬣

╭━━━〔 🔒 OWNER 〕━━━⬣
┃ ⬡ .mode / .update
┃ ⬡ .antidelete
┃ ⬡ .autoreact / .autostatus
┃ ⬡ .autotyping / .autoread
┃ ⬡ .anticall / .pmblocker
┃ ⬡ .settings
╰━━━━━━━━━━━━━━⬣

╭━━━〔 🎨 MEDIA 〕━━━⬣
┃ ⬡ .sticker / .removebg
┃ ⬡ .remini / .crop
┃ ⬡ .meme / .take
┃ ⬡ .emojimix
╰━━━━━━━━━━━━━━⬣

╭━━━〔 🎮 GAMES 〕━━━⬣
┃ ⬡ .tictactoe
┃ ⬡ .hangman / .guess
┃ ⬡ .trivia / .answer
┃ ⬡ .truth / .dare
╰━━━━━━━━━━━━━━⬣

╭━━━〔 🤖 AI 〕━━━⬣
┃ ⬡ .gpt / .gemini
┃ ⬡ .imagine / .flux
┃ ⬡ .sora
╰━━━━━━━━━━━━━━⬣

╭━━━〔 🎯 FUN 〕━━━⬣
┃ ⬡ .compliment / .insult
┃ ⬡ .flirt / .shayari
┃ ⬡ .ship / .simp
┃ ⬡ .character
╰━━━━━━━━━━━━━━⬣

╭━━━〔 📥 DOWNLOADER 〕━━━⬣
┃ ⬡ .play / .song
┃ ⬡ .spotify
┃ ⬡ .facebook / .instagram
┃ ⬡ .tiktok / .ytmp4
╰━━━━━━━━━━━━━━⬣

╭━━━〔 💻 GITHUB 〕━━━⬣
┃ ⬡ .git / .repo
┃ ⬡ .script / .sc
╰━━━━━━━━━━━━━━⬣

╭━━━〔 ⚡ SYSTEM 〕━━━⬣
┃ ✦ Fast | Stable | Secure
┃ ✦ Multi Device Supported
╰━━━━━━━━━━━━━━⬣

> ✨ Powered by ${botName}
> 🚀 Premium WhatsApp Bot Experience
`;

    try {
        const imagePath = path.join(__dirname, '../assets/bot_image.jpg');

        if (fs.existsSync(imagePath)) {
            const imageBuffer = fs.readFileSync(imagePath);

            await sock.sendMessage(chatId, {
                image: imageBuffer,
                caption: helpMessage,
                contextInfo: {
                    externalAdReply: {
                        title: botName,
                        body: 'Premium WhatsApp Bot',
                        thumbnailUrl: "https://i.imgur.com/4M34hi2.png",
                        sourceUrl: "https://github.com/mruniquehacker/Knightbot-MD",
                        mediaType: 0
                    }
                }
            }, { quoted: message });

        } else {
            await sock.sendMessage(chatId, {
                text: helpMessage
            }, { quoted: message });
        }

    } catch (error) {
        console.error('Help Command Error:', error);

        await sock.sendMessage(chatId, {
            text: helpMessage
        }, { quoted: message });
    }
}

module.exports = helpCommand;

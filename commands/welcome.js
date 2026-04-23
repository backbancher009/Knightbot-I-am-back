const { handleWelcome } = require('../lib/welcome');
const { isWelcomeOn, getWelcome } = require('../lib/index');
const { channelInfo } = require('../lib/messageConfig');

async function welcomeCommand(sock, chatId, message, match) {
    if (!chatId.endsWith('@g.us')) {
        await sock.sendMessage(chatId, { text: 'This command can only be used in groups.' });
        return;
    }

    const text = message.message?.conversation || 
                message.message?.extendedTextMessage?.text || '';
    const matchText = text.split(' ').slice(1).join(' ');

    await handleWelcome(sock, chatId, message, matchText);
}

async function handleJoinEvent(sock, id, participants) {
    const isWelcomeEnabled = await isWelcomeOn(id);
    if (!isWelcomeEnabled) return;

    const customMessage = await getWelcome(id);

    const groupMetadata = await sock.groupMetadata(id);
    const groupName = groupMetadata.subject;
    const groupDesc = groupMetadata.desc || 'No description available';

    for (const participant of participants) {
        try {
            const participantString = typeof participant === 'string'
                ? participant
                : (participant.id || participant.toString());

            const user = participantString.split('@')[0];

            let displayName = user;

            try {
                const contact = await sock.getBusinessProfile(participantString);
                if (contact?.name) {
                    displayName = contact.name;
                } else {
                    const userParticipant = groupMetadata.participants.find(p => p.id === participantString);
                    if (userParticipant?.name) {
                        displayName = userParticipant.name;
                    }
                }
            } catch {}

            let finalMessage;
            if (customMessage) {
                finalMessage = customMessage
                    .replace(/{user}/g, `@${displayName}`)
                    .replace(/{group}/g, groupName)
                    .replace(/{description}/g, groupDesc);
            } else {
                const now = new Date();
                const timeString = now.toLocaleString('en-US', {
                    month: '2-digit',
                    day: '2-digit', 
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                });

                finalMessage = `╭╼━≪•𝙽𝙴𝚆 𝙼𝙴𝙼𝙱𝙴𝚁•≫━╾╮
┃𝚆𝙴𝙻𝙲𝙾𝙼𝙴: @${displayName} 👋
┃Member count: #${groupMetadata.participants.length}
┃𝚃𝙸𝙼𝙴: ${timeString}⏰
╰━━━━━━━━━━━━━━━╯

*@${displayName}* Welcome to *${groupName}*! 🎉
*Group 𝙳𝙴𝚂𝙲𝚁𝙸𝙿𝚃𝙸𝙾𝙽*
${groupDesc}

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝐙𝐀𝐇𝐈𝐃-𝐁𝐎𝐓*`;
            }

            // 👉 Profile Picture Fetch
            let profilePicUrl;
            try {
                profilePicUrl = await sock.profilePictureUrl(participantString, 'image');
            } catch {
                profilePicUrl = 'https://i.imgur.com/4M34hi2.png'; // fallback image
            }

            // 👉 Send Profile Picture with Caption
            await sock.sendMessage(id, {
                image: { url: profilePicUrl },
                caption: finalMessage,
                mentions: [participantString],
                ...channelInfo
            });

        } catch (error) {
            console.error('Error:', error);

            const participantString = typeof participant === 'string'
                ? participant
                : (participant.id || participant.toString());

            const user = participantString.split('@')[0];

            await sock.sendMessage(id, {
                text: `Welcome @${user} to group 🎉`,
                mentions: [participantString],
                ...channelInfo
            });
        }
    }
}

module.exports = { welcomeCommand, handleJoinEvent };

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePlayerEmbeds = void 0;
const _utils_1 = require("..");
const distube_1 = require("distube");
const discord_js_1 = require("discord.js");
function generatePlayerEmbeds(queue) {
    const song = queue.songs[0];
    const embed = new discord_js_1.EmbedBuilder().setTitle(song.name);
    const thumbnail = song.thumbnail || song.playlist?.thumbnail;
    if (thumbnail)
        embed.setImage(thumbnail);
    if (song.user)
        embed.setAuthor({
            name: song.user.displayName,
            iconURL: song.user.avatarURL() || song.user.defaultAvatarURL,
            url: `https://discordapp.com/users/${song.user.id}`,
        });
    embed.addFields([
        {
            name: 'Длительность',
            value: (0, distube_1.formatDuration)(song.duration),
            inline: true,
        },
        {
            name: 'Источник',
            value: song.source,
            inline: true,
        },
        {
            name: 'Фильтры',
            value: queue.filters.size === 0 ? 'отсутствуют' : queue.filters.names.join(', '),
            inline: true,
        },
        {
            name: 'Режим повтора',
            value: ['отключен', 'песня', 'очередь'][queue.repeatMode],
            inline: true,
        },
        {
            name: 'Громкость',
            value: `${queue.volume}%`,
            inline: true,
        },
        {
            name: 'Скорость',
            value: `${(0, _utils_1.getQueueSpeedFilterValue)(queue)}x`,
            inline: true,
        },
    ]);
    return embed.setColor('Random');
}
exports.generatePlayerEmbeds = generatePlayerEmbeds;

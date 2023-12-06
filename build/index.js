"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = void 0;
const tslib_1 = require("tslib");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const error_handler_1 = tslib_1.__importDefault(require("./handlers/music/error.handler"));
const addQueue_handler_1 = tslib_1.__importDefault(require("./handlers/music/addQueue.handler"));
const finish_handler_1 = tslib_1.__importDefault(require("./handlers/music/finish.handler"));
const empty_handler_1 = tslib_1.__importDefault(require("./handlers/music/empty.handler"));
const interaction_handler_1 = tslib_1.__importDefault(require("./handlers/discord/interaction.handler"));
const error_handler_2 = tslib_1.__importDefault(require("./handlers/discord/error.handler"));
const ready_handler_1 = tslib_1.__importDefault(require("./handlers/discord/ready.handler"));
const deezer_1 = tslib_1.__importDefault(require("@distube/deezer"));
const distube_yandex_music_plugin_1 = require("distube-yandex-music-plugin");
const distube_vk_music_plugin_1 = require("distube-vk-music-plugin");
const yt_dlp_1 = require("@distube/yt-dlp");
const _utils_1 = require("./utils");
const discord_js_1 = require("discord.js");
const distube_1 = require("distube");
const fs_1 = require("fs");
const path_1 = require("path");
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.GuildVoiceStates,
    ],
});
exports.messages = new Map();
const start = async () => {
    const commandsPath = (0, path_1.join)(__dirname, 'modules');
    const commands = await (0, _utils_1.fetchCommands)(commandsPath);
    client.distube = new distube_1.DisTube(client, {
        youtubeCookie: JSON.parse((0, fs_1.readFileSync)('youtube-cookie.json', 'utf8')),
        leaveOnEmpty: true,
        leaveOnFinish: true,
        leaveOnStop: true,
        emptyCooldown: 0,
        plugins: [
            new deezer_1.default(),
            new distube_vk_music_plugin_1.VKMusicPlugin({ token: process.env.VK_MUSIC_TOKEN }),
            new distube_yandex_music_plugin_1.YandexMusicPlugin({ oauthToken: process.env.YANDEX_MUSIC_TOKEN }),
            new yt_dlp_1.YtDlpPlugin(),
        ],
    });
    client.distube.on('error', error_handler_1.default);
    client.distube.on('playSong', _utils_1.reGeneratePlayer);
    client.distube.on('addSong', addQueue_handler_1.default);
    client.distube.on('addList', addQueue_handler_1.default);
    client.distube.on('finish', finish_handler_1.default);
    client.distube.on('empty', empty_handler_1.default);
    client.on('interactionCreate', (0, interaction_handler_1.default)(commands, client));
    client.on('ready', (0, ready_handler_1.default)(commands));
    client.on('error', error_handler_2.default);
    await client.login(process.env.DISCORD_TOKEN);
};
start();

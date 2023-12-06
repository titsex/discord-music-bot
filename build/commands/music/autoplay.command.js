"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = new discord_js_1.SlashCommandBuilder()
    .setName('автовоспроизведение')
    .setDescription('автоматически добавляет в конец очереди песни, схожие с последней играющей');

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = new discord_js_1.SlashCommandBuilder()
    .setName('играть')
    .setDescription('проиграть музыку')
    .addStringOption((option) => option.setName('аргумент').setDescription('название или ссылка на источник').setRequired(true));

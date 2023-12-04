"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = new discord_js_1.SlashCommandBuilder()
    .setName('громкость')
    .setDescription('изменяет громкость проигрывания песен')
    .addNumberOption((option) => option
    .setName('громкость')
    .setDescription('значение в процентах')
    .setMinValue(0)
    .setMaxValue(100)
    .setRequired(true));

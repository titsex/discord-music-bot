"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = new discord_js_1.SlashCommandBuilder()
    .setName('скорость')
    .setDescription('изменяет скорость проигрывания')
    .addNumberOption((option) => option
    .setName('скорость')
    .setDescription('выберите скорость проигрывания песни')
    .addChoices({ name: '0.25x', value: 0.25 }, { name: '0.5x', value: 0.5 }, { name: '0.75x', value: 0.75 }, { name: '1x', value: 1 }, { name: '1.25x', value: 1.25 }, { name: '1.5x', value: 1.5 }, { name: '1.75x', value: 1.75 }, { name: '2x', value: 2 })
    .setRequired(true));

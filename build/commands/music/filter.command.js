"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterList = void 0;
const discord_js_1 = require("discord.js");
const distube_1 = require("distube");
exports.filterList = Object.keys(distube_1.defaultFilters).map((item) => ({ name: item, value: item }));
exports.default = new discord_js_1.SlashCommandBuilder()
    .setName('фильтр')
    .setDescription('добавляет/удаляет филтры к песням')
    .addStringOption((option) => option
    .setName('фильтр')
    .setDescription('выберите фильтр который нужно наложить/снять')
    .addChoices(...exports.filterList)
    .setRequired(true));

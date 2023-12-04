"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePlayerFilterMenu = void 0;
const discord_js_1 = require("discord.js");
const filter_command_1 = require("../../commands/music/filter.command");
const _types_1 = require("../../types");
function generatePlayerFilterMenu(queue) {
    const filters = new discord_js_1.ActionRowBuilder();
    const filterMenu = new discord_js_1.StringSelectMenuBuilder({
        customId: _types_1.PLAYER_CUSTOM_IDS.TOGGLE_FILTER,
        placeholder: 'Выберите фильтр',
    });
    for (const { name, value } of filter_command_1.filterList) {
        const hasFilter = !!queue.filters.names.find((filter) => filter === value);
        const option = {
            label: name,
            value: value,
            description: hasFilter ? 'включен' : 'отключен',
        };
        if (hasFilter)
            option.emoji = { name: '✅' };
        filterMenu.addOptions(option);
    }
    return filters.addComponents(filterMenu);
}
exports.generatePlayerFilterMenu = generatePlayerFilterMenu;

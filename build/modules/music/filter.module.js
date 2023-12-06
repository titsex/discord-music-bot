"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const filter_command_1 = tslib_1.__importDefault(require("../../commands/music/filter.command"));
const FilterModule = {
    data: filter_command_1.default,
    type: 'music',
    execute: async (interaction, client) => {
        const queue = client.distube.queues.get(interaction.guildId);
        const filter = interaction.options.getString('фильтр', true);
        if (queue.filters.has(filter))
            queue.filters.remove(filter);
        else
            queue.filters.add(filter);
        return await interaction.send('Фильтры обновлены.');
    },
};
exports.default = FilterModule;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _types_1 = require("../../types");
const _utils_1 = require("../../utils");
async function selectHandler(interaction, client) {
    const customId = interaction.customId;
    const queue = client.distube.getQueue(interaction.guildId);
    if (!queue)
        return;
    if (customId === _types_1.PLAYER_CUSTOM_IDS.TOGGLE_FILTER) {
        const filter = interaction.values[0];
        if (queue.filters.has(filter))
            queue.filters.remove(filter);
        else
            queue.filters.add(filter);
    }
    await interaction.update((0, _utils_1.generatePlayer)(queue));
}
exports.default = selectHandler;

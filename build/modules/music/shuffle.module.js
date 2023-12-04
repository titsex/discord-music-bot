"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const shuffle_command_1 = tslib_1.__importDefault(require("../../commands/music/shuffle.command"));
const ShuffleModule = {
    data: shuffle_command_1.default,
    type: 'music',
    execute: async (interaction, client) => {
        await client.distube.shuffle(interaction.guildId);
        return await interaction.send('Перемешиваю...');
    },
};
exports.default = ShuffleModule;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const skip_command_1 = tslib_1.__importDefault(require("../../commands/music/skip.command"));
const SkipModule = {
    data: skip_command_1.default,
    type: 'music',
    execute: async (interaction, client) => {
        try {
            await client.distube.skip(interaction.guildId);
            return await interaction.send('Пропускаю...');
        }
        catch (error) {
            await interaction.send('Данная песня последняя в очереди');
        }
    },
};
exports.default = SkipModule;

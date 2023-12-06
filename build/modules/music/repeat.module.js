"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const repeat_command_1 = tslib_1.__importDefault(require("../../commands/music/repeat.command"));
const RepeatModule = {
    data: repeat_command_1.default,
    type: 'music',
    execute: async (interaction, client) => {
        const mode = interaction.options.getNumber('режим', true);
        client.distube.setRepeatMode(interaction.guildId, mode);
        return await interaction.send(`Переключаю режим повтора...`);
    },
};
exports.default = RepeatModule;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const play_command_1 = tslib_1.__importDefault(require("../../commands/music/play.command"));
const PlayModule = {
    data: play_command_1.default,
    type: 'music',
    execute: async (interaction, client, member) => {
        const argument = interaction.options.getString('аргумент', true);
        await interaction.send('Добавляю в очередь...');
        return await client.distube.play(member.voice.channel, argument, {
            member,
            textChannel: interaction.channel,
        });
    },
};
exports.default = PlayModule;

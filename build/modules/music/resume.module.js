"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const resume_command_1 = tslib_1.__importDefault(require("../../commands/music/resume.command"));
const ResumeModule = {
    data: resume_command_1.default,
    type: 'music',
    execute: async (interaction, client) => {
        const queue = client.distube.queues.get(interaction.guildId);
        if (queue?.playing)
            return await interaction.send('Песня не стоит на паузе');
        client.distube.resume(interaction.guildId);
        return await interaction.send('Снимаю паузу с песни...');
    },
};
exports.default = ResumeModule;

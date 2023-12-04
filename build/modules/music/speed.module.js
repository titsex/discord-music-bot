"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const speed_command_1 = tslib_1.__importDefault(require("../../commands/music/speed.command"));
const _utils_1 = require("../../utils");
const speed_filter_1 = require("../../filters/speed.filter");
const SpeedModule = {
    data: speed_command_1.default,
    type: 'music',
    execute: async (interaction, client) => {
        const queue = client.distube.queues.get(interaction.guildId);
        const speed = interaction.options.getNumber('скорость', true);
        if (speed === 1)
            queue.filters.remove({ name: 'speed', value: (0, _utils_1.getQueueSpeedFilterValue)(queue).toString() });
        else
            queue.filters.add((0, speed_filter_1.genSpeedFilter)(speed), true);
        return await interaction.send(`Меняю скорость воспроизведения...`);
    },
};
exports.default = SpeedModule;

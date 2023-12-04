"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const select_handler_1 = tslib_1.__importDefault(require("../discord/select.handler"));
const button_handler_1 = tslib_1.__importDefault(require("../discord/button.handler"));
const play_command_1 = tslib_1.__importDefault(require("../../commands/music/play.command"));
const _utils_1 = require("../../utils");
const _index_1 = require("../../index");
function interactionHandler(commands, client) {
    return async (interaction) => {
        if (interaction.isButton())
            return await (0, button_handler_1.default)(interaction, client);
        if (interaction.isStringSelectMenu())
            return await (0, select_handler_1.default)(interaction, client);
        if (!interaction.isChatInputCommand())
            return;
        const context = (0, _utils_1.extendInteraction)(interaction);
        const command = commands.find((item) => item.data.name === interaction.commandName);
        if (command) {
            let member;
            if (command.type === 'music') {
                member = 'voice' in interaction.member ? interaction.member : null;
                if (!member || !member?.voice.channel)
                    return await context.send('Сначала подключитесь к голосовому каналу');
                const bot = client.distube.getQueue(context.guildId);
                if (!bot && command.data.name !== play_command_1.default.name)
                    return await context.send('Бот не состоит ни в одном из голосовых каналов');
                if (bot?.voice.channelId && bot.voice.channelId !== member.voice.channelId)
                    return await context.send('Бот в данный момент находится в другом голосовом канале');
            }
            await command.execute(context, client, member);
            if (command.type === 'music' && command.data.name !== play_command_1.default.name) {
                const queue = client.distube.queues.get(interaction.guildId);
                if (!queue)
                    return;
                if (!_index_1.messages.get(queue.textChannel.guildId))
                    return;
                else
                    await (0, _utils_1.reGeneratePlayer)(queue);
            }
        }
    };
}
exports.default = interactionHandler;

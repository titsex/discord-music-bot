"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extendInteraction = exports.fetchCommands = exports.updateCommands = exports.getDate = void 0;
const fs_1 = require("fs");
const discord_js_1 = require("discord.js");
const Logger_1 = require("../classes/Logger");
const path_1 = require("path");
function getDate() {
    return new Date().toLocaleString('ru-RU');
}
exports.getDate = getDate;
async function updateCommands(commands) {
    const rest = new discord_js_1.REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);
    try {
        await rest.put(discord_js_1.Routes.applicationCommands(process.env.DISCORD_ID), {
            body: commands.map((command) => command.data),
        });
    }
    catch (error) {
        Logger_1.Logger.error(error);
    }
}
exports.updateCommands = updateCommands;
async function fetchCommands(path, commands = []) {
    const files = (0, fs_1.readdirSync)(path);
    for (const file of files) {
        const filePath = (0, path_1.join)(path, file);
        const isDirectory = (0, fs_1.statSync)(filePath).isDirectory();
        if (isDirectory)
            await fetchCommands(filePath, commands);
        else
            commands.push(await Promise.resolve(`${filePath}`).then(s => __importStar(require(s))));
    }
    return commands.map((command) => Object.values(command)[0]);
}
exports.fetchCommands = fetchCommands;
function extendInteraction(interaction) {
    interaction.send = async (content) => await interaction.reply({
        content,
        ephemeral: true,
    });
    return interaction;
}
exports.extendInteraction = extendInteraction;

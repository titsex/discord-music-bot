"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("../../classes/Logger");
async function discordErrorHandler(error) {
    Logger_1.Logger.error(error);
}
exports.default = discordErrorHandler;

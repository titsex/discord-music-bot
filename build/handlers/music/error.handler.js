"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Logger_1 = require("../../classes/Logger");
async function distubeErrorHandler(channel, error) {
    Logger_1.Logger.error(error);
}
exports.default = distubeErrorHandler;

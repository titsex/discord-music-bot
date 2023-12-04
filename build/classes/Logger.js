"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const _types_1 = require("../types");
const _utils_1 = require("../utils");
class Logger {
    static info(...data) {
        console.log(`${_types_1.COLORS.CYAN + _types_1.COLOR_TYPES.BOLD}[INFO]${_types_1.COLORS.NONE + _types_1.COLOR_TYPES.NONE} ${_types_1.COLORS.YELLOW + _types_1.COLOR_TYPES.NONE}(${(0, _utils_1.getDate)()})${_types_1.COLORS.NONE + _types_1.COLOR_TYPES.NONE}:`, ...data);
    }
    static error(...data) {
        console.log(`${_types_1.COLORS.RED + _types_1.COLOR_TYPES.BOLD}[ERROR]${_types_1.COLORS.NONE + _types_1.COLOR_TYPES.NONE} ${_types_1.COLORS.YELLOW + _types_1.COLOR_TYPES.NONE}(${(0, _utils_1.getDate)()})${_types_1.COLORS.NONE + _types_1.COLOR_TYPES.NONE}:`, ...data);
    }
}
exports.Logger = Logger;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.COLOR_TYPES = exports.PLAYER_CUSTOM_IDS = exports.COLORS = exports.CustomClient = void 0;
const discord_js_1 = require("discord.js");
class CustomClient extends discord_js_1.Client {
    distube;
}
exports.CustomClient = CustomClient;
var COLORS;
(function (COLORS) {
    COLORS["NONE"] = "\u001B[0";
    COLORS["CYAN"] = "\u001B[36";
    COLORS["RED"] = "\u001B[31";
    COLORS["YELLOW"] = "\u001B[33";
})(COLORS || (exports.COLORS = COLORS = {}));
var PLAYER_CUSTOM_IDS;
(function (PLAYER_CUSTOM_IDS) {
    PLAYER_CUSTOM_IDS["START_SONG_AGAIN"] = "player-start-song-again";
    PLAYER_CUSTOM_IDS["PREVIOUS"] = "player-previous";
    PLAYER_CUSTOM_IDS["TOGGLE_PLAY_MODE"] = "player-toggle-play-mode";
    PLAYER_CUSTOM_IDS["NEXT"] = "player-next";
    PLAYER_CUSTOM_IDS["TOGGLE_REPEAT_MODE"] = "player-toggle-repeat-mode";
    PLAYER_CUSTOM_IDS["SPEED_DOWN"] = "player-speed-down";
    PLAYER_CUSTOM_IDS["VOLUME_DECREASE"] = "player-volume-decrease";
    PLAYER_CUSTOM_IDS["STOP"] = "player-stop";
    PLAYER_CUSTOM_IDS["VOLUME_INCREASE"] = "player-volume-increase";
    PLAYER_CUSTOM_IDS["SPEED_UP"] = "player-speed-up";
    PLAYER_CUSTOM_IDS["TOGGLE_FILTER"] = "player-toggle-filter";
})(PLAYER_CUSTOM_IDS || (exports.PLAYER_CUSTOM_IDS = PLAYER_CUSTOM_IDS = {}));
var COLOR_TYPES;
(function (COLOR_TYPES) {
    COLOR_TYPES["NONE"] = "m";
    COLOR_TYPES["BOLD"] = ";1m";
})(COLOR_TYPES || (exports.COLOR_TYPES = COLOR_TYPES = {}));

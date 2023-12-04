"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genSpeedFilter = void 0;
function genSpeedFilter(speed) {
    return {
        name: 'speed',
        value: `atempo=sqrt(${speed}),atempo=sqrt(${speed})`,
    };
}
exports.genSpeedFilter = genSpeedFilter;

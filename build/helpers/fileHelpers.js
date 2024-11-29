"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeData = exports.readData = void 0;
const fs_1 = __importDefault(require("fs"));
const readData = (file) => {
    const data = fs_1.default.readFileSync(file, 'utf-8');
    return JSON.parse(data);
};
exports.readData = readData;
const writeData = (file, data) => {
    fs_1.default.writeFileSync(file, JSON.stringify(data, null, 2));
};
exports.writeData = writeData;

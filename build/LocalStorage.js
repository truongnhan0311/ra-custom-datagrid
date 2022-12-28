"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const get_1 = __importDefault(require("lodash/get"));
const STORAGE_KEY = 'raColumnsConfig';
// Very basic storage helper
// values are stored in browser localStorage
const getRootValue = () => {
    try {
        return JSON.parse(window.localStorage.getItem(STORAGE_KEY));
    }
    catch (e) {
        return undefined;
    }
};
const setRootValue = (value) => {
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    }
    catch (e) {
    }
};
const LocalStorage = {
    get(key) {
        return (0, get_1.default)(getRootValue(), key);
    },
    set(key, value) {
        const oldValue = getRootValue();
        setRootValue(Object.assign(Object.assign({}, oldValue), { [key]: value }));
    },
};
exports.default = LocalStorage;

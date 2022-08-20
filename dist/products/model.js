"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const schema_js_1 = require("./schema.js");
const mongoose_1 = __importDefault(require("mongoose"));
exports.ProductModel = new mongoose_1.default.model("products", schema_js_1.ProductSchema);

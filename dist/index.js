"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = require("./app.js");
const mongoose_1 = __importDefault(require("mongoose"));
const port = process.env.PORT || 3000;
console.log(process.env.MONGO_URL);
mongoose_1.default.connect(process.env.MONGO_URL)
    .then(() => {
    console.log(`Connected to Mongo`);
    app_js_1.app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

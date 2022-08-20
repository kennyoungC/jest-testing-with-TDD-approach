"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const model_js_1 = require("./model.js");
const productsRouter = express_1.default.Router();
productsRouter
    .get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield model_js_1.ProductModel.find({});
    res.send(products);
}))
    .post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new model_js_1.ProductModel(req.body);
    yield product.save();
    res.status(201).send(product);
}))
    .get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield model_js_1.ProductModel.findById(req.params.id);
    if (!product) {
        res.status(404).send("Product not found");
    }
    else {
        res.send(product);
    }
}))
    .put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield model_js_1.ProductModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
        res.status(404).send("Product not found");
    }
    else {
        res.send(product);
    }
}))
    .delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield model_js_1.ProductModel.findByIdAndDelete(req.params.id);
    if (!product) {
        res.status(404).send("Product not found");
    }
    else {
        res.status(204).send();
    }
}));
exports.default = productsRouter;

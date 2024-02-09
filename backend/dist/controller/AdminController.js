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
exports.admin = void 0;
const adminService_1 = __importDefault(require("../services/adminService"));
const admin = (app) => {
    const service = new adminService_1.default();
    app.post("/admin/signup", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { name, email, password, phone, address } = req.body;
            const { data } = yield service.SignUp({ name, email, password, phone, address });
            return res.json(data);
        }
        catch (err) {
            next(err);
        }
    }));
    app.post("/admin/login", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const { data } = yield service.signIn({ email, password });
            return res.json(data);
        }
        catch (err) {
            next(err);
        }
    }));
};
exports.admin = admin;

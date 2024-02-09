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
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormateData = exports.ValidateSignature = exports.GenerateSignature = exports.ValidatePassword = exports.GeneratePassword = exports.GenerateSalt = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../config");
//Utility functions
function GenerateSalt() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, bcrypt_1.genSalt)();
    });
}
exports.GenerateSalt = GenerateSalt;
function GeneratePassword(password, salt) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, bcrypt_1.hash)(password, salt);
    });
}
exports.GeneratePassword = GeneratePassword;
function ValidatePassword(enteredPassword, savedPassword, salt) {
    return __awaiter(this, void 0, void 0, function* () {
        return (yield GeneratePassword(enteredPassword, salt)) === savedPassword;
    });
}
exports.ValidatePassword = ValidatePassword;
function GenerateSignature(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return (0, jsonwebtoken_1.sign)(payload, config_1.APP_SECRET, { expiresIn: "30d" });
        }
        catch (error) {
            console.log(error);
            return error;
        }
    });
}
exports.GenerateSignature = GenerateSignature;
function ValidateSignature(req) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const signature = req.get("Authorization");
            console.log(signature);
            const payload = (0, jsonwebtoken_1.verify)(signature.split(" ")[1], config_1.APP_SECRET);
            req.user = payload;
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    });
}
exports.ValidateSignature = ValidateSignature;
function FormateData(data) {
    if (data) {
        return { data };
    }
    else {
        throw new Error("Data Not found!");
    }
}
exports.FormateData = FormateData;

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
exports.AdminRepository = void 0;
const adminModel_1 = __importDefault(require("../models/adminModel"));
const app_error_1 = require("../utils/app-error");
class AdminRepository {
    createAdmin({ name, email, password, phone, address, salt }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const admin = new adminModel_1.default({
                    name,
                    email,
                    password,
                    phone,
                    address,
                    salt
                });
                const adminResults = yield admin.save();
                return adminResults;
            }
            catch (err) {
                throw new app_error_1.APIError("API Error", app_error_1.STATUS_CODES.INTERNAL_ERROR, "Unable to Create Admin", true, "", true);
            }
        });
    }
    findAdmin({ email }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingAdmin = yield adminModel_1.default.findOne({ email });
                //console.log(existingAdmin);
                if (!existingAdmin) {
                    // Handle the case where no admin is found with the specified email
                    throw new app_error_1.APIError("Not Found", app_error_1.STATUS_CODES.NOT_FOUND, "Admin not found", true, "", true);
                }
                return existingAdmin;
            }
            catch (err) {
                // Handle other errors
                throw new app_error_1.APIError("API Error", app_error_1.STATUS_CODES.INTERNAL_ERROR, "Unable to find admin", true, "", true);
            }
        });
    }
}
exports.AdminRepository = AdminRepository;

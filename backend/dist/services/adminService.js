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
const adminRepository_1 = require("../repository/adminRepository");
const utils_1 = require("../utils");
const app_error_1 = require("../utils/app-error");
class AdminService {
    constructor() {
        this.repository = new adminRepository_1.AdminRepository();
    }
    SignUp(userInputs) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, phone, address } = userInputs;
            if (!name || !email || !password || !phone || !address) {
                throw new app_error_1.APIError("API ERROR", app_error_1.STATUS_CODES.BAD_REQUEST, "Missing required fields", true, "", true);
            }
            try {
                // create salt
                const salt = yield (0, utils_1.GenerateSalt)();
                console.log(salt);
                const userPassword = yield (0, utils_1.GeneratePassword)(password, salt);
                //   console.log(userPassword);
                const newAdmin = yield this.repository.createAdmin({
                    name,
                    email,
                    password: userPassword,
                    phone,
                    address,
                    salt,
                });
                const token = yield (0, utils_1.GenerateSignature)({
                    email: email,
                    _id: newAdmin._id,
                });
                return (0, utils_1.FormateData)({ id: newAdmin._id, token });
            }
            catch (err) {
                throw new app_error_1.APIError("API Error", app_error_1.STATUS_CODES.INTERNAL_ERROR, "Data Not found", true, "", true);
            }
        });
    }
    signIn(userInputs) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = userInputs;
            try {
                const existingAdmin = yield this.repository.findAdmin({ email });
                console.log("existingAdmin:", existingAdmin);
                if (existingAdmin) {
                    const validPassword = yield (0, utils_1.ValidatePassword)(password, existingAdmin.password, existingAdmin.salt);
                    console.log("validPassword:", validPassword);
                    if (validPassword) {
                        const token = yield (0, utils_1.GenerateSignature)({ email: existingAdmin.email, _id: existingAdmin._id });
                        return (0, utils_1.FormateData)({ id: existingAdmin._id, token });
                    }
                }
                return (0, utils_1.FormateData)(null);
            }
            catch (err) {
                console.error(err); // Log the actual error for debugging
                throw new app_error_1.APIError("API Error", app_error_1.STATUS_CODES.INTERNAL_ERROR, "Data Not found here", true, "", true);
            }
        });
    }
}
exports.default = AdminService;

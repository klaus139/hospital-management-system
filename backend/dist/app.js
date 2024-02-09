"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//routes
const adminRoute_1 = __importDefault(require("./routes/adminRoute"));
const config_1 = require("./config");
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json({}));
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)());
//routers
app.use("/api/admin", adminRoute_1.default);
//database
(0, config_1.connectDB)();
app.listen(config_1.PORT, () => {
    console.log(`server is running on ${config_1.URL}:${config_1.PORT}`);
});

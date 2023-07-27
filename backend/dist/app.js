"use strict";
// console.log("hiii")
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const { logger } = require("./middleware/logger");
const route_1 = require("./routes/route");
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
(0, dotenv_1.config)();
(0, db_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(logger);
app.get("/", (req, res) => {
    res.send("hellow form ts");
});
// Add the routes
app.use("/", route_1.router);
// Start the server
const PORT = Number(process.env.PORT) || 6010;
const server = app.listen(PORT, () => console.log(`runig on port  ${PORT}`));

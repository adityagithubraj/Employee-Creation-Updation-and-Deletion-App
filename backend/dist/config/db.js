"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
function connects() {
    return (0, mongoose_1.connect)(process.env.MongoURL)
        .then(() => {
        console.log("db connected");
    }).catch((error) => {
        console.log(error);
    });
}
exports.default = connects;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
function connects() {
    return (0, mongoose_1.connect)("mongodb+srv://aditya:4458@cluster0.llnoazc.mongodb.net/TSAPP?retryWrites=true&w=majority")
        .then(() => {
        console.log("db connected");
    }).catch((error) => {
        console.log(error);
    });
}
exports.default = connects;

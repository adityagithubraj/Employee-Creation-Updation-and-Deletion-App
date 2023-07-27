"use strict";
// import express,{Request, Response} from "express";
// import { gethome } from "../controllers/emp";
// const router = express.Router();
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
exports.router = void 0;
// router.get("/home",gethome)
// export{router}
const express_1 = __importDefault(require("express"));
const model_1 = __importDefault(require("../model/model"));
const router = express_1.default.Router();
exports.router = router;
router.get("/logs", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const logs = yield logsModel.aggregate([{ $sort: { "timestamp": -1 } }, { $limit: 30 }]);
        res.json({ logs });
    }
    catch (error) {
        console.log(error);
        res.json({ msg: error });
    }
}));
router.get('/employees', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield model_1.default.find({ isDeleted: false });
        res.status(200).send({ employees });
    }
    catch (error) {
        res.status(500).send("error");
    }
}));
router.post('/employees', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, title, department, annualSalary } = req.body;
        const employee = new model_1.default({
            name,
            title,
            department,
            annualSalary,
        });
        yield employee.save();
        res.status(201).send({ msg: "Employee Added" });
    }
    catch (error) {
        res.status(400).send("error");
    }
}));
router.put('/employees/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, title, department, annualSalary } = req.body;
        const employee = yield model_1.default.findByIdAndUpdate(id, { name,
            title,
            department,
            annualSalary,
        }, { new: true });
        if (!employee) {
            return res.status(404).send({ msg: 'Employee not found' });
        }
        else {
            res.status(201).send({ msg: "Employee Details Edited" });
        }
    }
    catch (error) {
        res.status(400).send("error");
    }
}));
router.delete('/employees/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const employee = yield model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
        if (!employee) {
            return res.status(404).send({ msg: 'Employee not found' });
        }
        else {
            res.status(201).send({ msg: "Employee Deleted Sucessfully" });
        }
    }
    catch (error) {
        res.status(500).send("error");
    }
}));

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
exports.HttpInterface = exports.returnX = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const service_1 = require("hello/service");
// import { UserService } from 'users/service'
const utils_1 = require("utils");
function returnX() {
    return 'x';
}
exports.returnX = returnX;
class HttpInterface {
    constructor() {
        this.app = (0, express_1.default)();
        this.utils();
        this.middleware();
        this.security();
        this.routes();
    }
    utils() {
        this.app.disable('x-powered-by');
    }
    middleware() {
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    security() { }
    routes() {
        this.app.use('/', new service_1.HelloService().router);
        // this.app.use('/u', new UserService().router)
    }
    /** Method dedicated for database connection. */
    database() {
        try {
            mongoose_1.default.connect(utils_1.MONGODB_URL);
        }
        catch (e) {
            throw Error(e);
        }
        // TODO: Add `mongoose` error handling
        return mongoose_1.default;
    }
    /** Method dedicated for running Express.js server. */
    startup() {
        return __awaiter(this, void 0, void 0, function* () {
            // Ensure application connected to database before run.
            this.database();
            this.app.listen(utils_1.PORT, () => {
                console.log(`Application is working on http://${utils_1.HOST}:${utils_1.PORT}`);
            });
        });
    }
}
exports.HttpInterface = HttpInterface;
new HttpInterface().startup();

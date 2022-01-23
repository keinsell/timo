"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MONGODB_URL = exports.HOST = exports.PORT = void 0;
exports.PORT = process.env.PORT || 1337;
exports.HOST = process.env.HOST || 'localhost';
exports.MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost/timo';

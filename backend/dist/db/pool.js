"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = __importDefault(require("pg"));
const conn = process.env.DATABASE_URL;
if (!conn) {
    throw new Error('DATABASE_URL environment variable is not set');
}
const pool = new pg_1.default.Pool({ connectionString: conn });
exports.default = pool;

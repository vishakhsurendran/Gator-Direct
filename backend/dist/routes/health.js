"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const r = (0, express_1.Router)();
r.get('/', (req, res) => res.json({ status: 'ok' }));
exports.default = r;

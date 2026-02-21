"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const r = (0, express_1.Router)();
// placeholder: expects node ids or lat/lng; returns an array of coords
r.post('/route', async (req, res) => {
    // implement with pgRouting later
    res.json({ route: [] });
});
exports.default = r;

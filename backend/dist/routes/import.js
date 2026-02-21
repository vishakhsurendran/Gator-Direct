"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pool_1 = __importDefault(require("../db/pool"));
const r = (0, express_1.Router)();
r.post('/building', async (req, res) => {
    try {
        const { name, footprint } = req.body;
        if (!name || !footprint)
            return res.status(400).json({ error: 'name and footprint required' });
        const sql = `INSERT INTO buildings (name, footprint) VALUES ($1, ST_SetSRID(ST_GeomFromGeoJSON($2), 4326)) RETURNING id`;
        const { rows } = await pool_1.default.query(sql, [name, JSON.stringify(footprint)]);
        res.status(201).json(rows[0]);
    }
    catch (err) {
        console.error('POST /import/building error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});
exports.default = r;

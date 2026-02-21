"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pool_1 = __importDefault(require("../db/pool"));
const r = (0, express_1.Router)();
r.get('/', async (req, res) => {
    try {
        const q = `SELECT id, name, ST_AsGeoJSON(footprint) AS footprint FROM buildings`;
        const { rows } = await pool_1.default.query(q);
        const features = rows.map((row) => {
            // ST_AsGeoJSON can return null -> guard it
            const geom = row.footprint ? JSON.parse(row.footprint) : null;
            return {
                type: 'Feature',
                geometry: geom,
                properties: { id: row.id, name: row.name }
            };
        });
        res.json({ type: 'FeatureCollection', features });
    }
    catch (err) {
        console.error('GET /buildings error:', err);
        res.status(500).json({ error: 'Database error' });
    }
});
exports.default = r;

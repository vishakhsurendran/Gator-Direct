"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const health_1 = __importDefault(require("./routes/health"));
const buildings_1 = __importDefault(require("./routes/buildings"));
const import_1 = __importDefault(require("./routes/import"));
const routing_1 = __importDefault(require("./routes/routing"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/health', health_1.default);
app.use('/buildings', buildings_1.default);
app.use('/import', import_1.default);
app.use('/routing', routing_1.default);
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`API listening on ${port}`));

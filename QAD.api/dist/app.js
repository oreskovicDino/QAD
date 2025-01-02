"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const cors_1 = __importDefault(require("cors"));
const data_source_1 = require("./config/data-source");
const router_1 = __importDefault(require("./routes/router"));
const public_router_1 = __importDefault(require("./routes/public.router"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// const corsOptions = {
//     origin: 'http://example.com', // Allow only this origin
//     methods: 'GET,POST', // Allow only these methods
//     allowedHeaders: 'Content-Type,Authorization', // Allow only these headers
// };
// app.use(cors(corsOptions));
app.use((0, cors_1.default)());
// Public routes
app.use('/api', public_router_1.default);
// Authorized Routes
app.use('/api', authMiddleware_1.verifyFirebaseToken, router_1.default);
data_source_1.AppDataSource.initialize().then(() => {
    // Start Server
    console.log('Database connected');
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}).catch(error => console.log(error));

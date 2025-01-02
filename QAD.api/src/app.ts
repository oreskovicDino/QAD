import 'reflect-metadata';
import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import { verifyFirebaseToken } from './middleware/authMiddleware';
import cors from 'cors';
import { AppDataSource } from './config/data-source';
import router from './routes/router';
import publicRouter from './routes/public.router';
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
// const corsOptions = {
//     origin: 'http://example.com', // Allow only this origin
//     methods: 'GET,POST', // Allow only these methods
//     allowedHeaders: 'Content-Type,Authorization', // Allow only these headers
// };
// app.use(cors(corsOptions));
app.use(cors());

// Public routes
app.use('/api', publicRouter);
// Authorized Routes
app.use('/api', verifyFirebaseToken, router);

AppDataSource.initialize().then(() => {
    // Start Server
    console.log('Database connected');
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}).catch(error => console.log(error));

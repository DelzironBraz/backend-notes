import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import notesRouter from './src/routes/notes.js';

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

app.use('/api', notesRouter);

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.info(`Database connected and server running on port http://localhost:${process.env.PORT}`);
        });
    }).catch((error) => {
        console.error('Error connecting to the database', error);
    });
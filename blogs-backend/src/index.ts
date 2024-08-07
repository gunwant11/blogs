import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';
import cors from 'cors';

dotenv.config();
// allow localhost:3000 to access the API

const app = express();


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));



app.use('/api', authRoutes);
app.use('/api', postRoutes);

app.get('/', (req, res) => {
    res.send('Server is running');
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

import express from 'express';
import snippetRouter from './routes/snippet.js';
import cors from 'cors';

const app = express();
const PORT = 8000;

app.use(express.json());
// Middleware to parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow credentials if needed
}));

app.use("/api/v1/snippet", snippetRouter);

"http://localhost:${PORT}/api/v1/snippet";


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
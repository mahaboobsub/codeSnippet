import express from 'express';
import commentRouter from './routes/comment.js';
import cors from 'cors';



const app = express();
const PORT = 8001;

app.use(express.json());
// Middleware to parse URL-encoded bodies (for form submissions)
app.use(express.urlencoded({ extended: true }));

// Enable CORS for the frontend application
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend's URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow credentials if needed
}));
"http://localhost:${PORT}/api/v1/snippet/:id/comment";

app.post("/events", (req, res) => {
  console.log("Event received:", req.body.type);
  return res.status(200).json({});
});

app.use("/api/v1/snippet", commentRouter);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
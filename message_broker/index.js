import express from 'express';
import axios from 'axios';


const app = express();
const PORT = 8005;

app.use(express.json());
// Middleware to parse URL-encoded bodies (for form submissions)    
app.use(express.urlencoded({ extended: true }));


app.post("/events", (req, res) => {
    const events = req.body;

    axios.post("http://localhost:8000/events",events);//snippet service
    axios.post("http://localhost:8001/events",events);//comment service
    axios.post("http://localhost:8002/events",events);//query service

    return res.status(200).json({});
}); 

app.listen(PORT, () => {
      console.log(`Message Broker is running on port ${PORT}`);
});
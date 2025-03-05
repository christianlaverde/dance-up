//import express from 'express';
import app from './app.js';
import dotenv from 'dotenv';


dotenv.config();

//const app = express();
const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

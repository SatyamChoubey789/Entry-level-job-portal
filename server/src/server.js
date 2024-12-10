const dotenv = require('dotenv');
const process = require('process');
const connectDB = require('./config/db');
const app = require('./app');

// Load environment variables from .env file
dotenv.config({
  path: '.env',
});

connectDB();
app.listen(process.env.PORT || 8000, () => {
  console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
});

import app from './app';
import dotenv from 'dotenv';
import http from 'http';

dotenv.config({ path: './src/config/config.env' }); //load env vars

//server setup
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

import dotenv from 'dotenv';
import http from 'http';
import {app} from './app.js'
import connectDB from './db/db.js';

dotenv.config();

const port = process.env.PORT || 8000;
const server = http.createServer(app);

(async () => {
    try {
        await connectDB();
        console.log("Database connected.....")

        server.listen(port, () =>{
            console.log(`Server is running on port ${port}`);
        });

        server.on('error', (err) => {
        console.error("Server error: ", err);
        });

        server.on('close', () => {
        console.log(" Server closed");
        });
    } catch (error) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
})();
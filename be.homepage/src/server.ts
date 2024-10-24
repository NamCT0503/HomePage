import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import router from "./routes/app.route";
import adminRouter from "./routes/admin.route";
import multer from "multer";
import fs from "fs";
import WSServer from "./websocket/ws.server";

dotenv.config();

const app = express();
const port = process.env.PORT;

// app.use(cors());

app.use(cors({
    origin: 'https://homepage.ftcom.org/', 
    methods: 'GET,POST,PUT,DELETE',            
    credentials: true   
}));

app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../public/uploads')));

app.use('/api/homepage', router);
app.use('/api/homepage/admin', adminRouter)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});

WSServer(app);
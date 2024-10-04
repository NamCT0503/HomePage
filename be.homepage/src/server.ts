import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import router from "./routes/app.route";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/homepage', router);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})
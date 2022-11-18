import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";

import routes from "./routes/index";
import env from "./configs/Env";

process.title = "BOX_OFFICE";

function main()
{
    const app = express();
    const server = http.createServer(app);

    const port = process.env.SERVER_PORT ||3001;

    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.disable("x-powered-by");
    app.use("/api", routes);

    app.listen(port, () => 
    {
        console.log(`Its running in ${port}`);
    });

} main();
import express from "express";

import { summaryRouter } from "./routes/summary.route";
import { standingsRouter } from "./routes/standings.route";
import { scheduleRouter } from "./routes/schedule.route";
import { qualiRouter } from "./routes/quali.route";

const router = express.Router();

export default (): express.Router => {
    summaryRouter(router);
    standingsRouter(router);
    scheduleRouter(router);
    qualiRouter(router);
    return router;
};
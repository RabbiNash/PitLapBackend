import express from "express";

import { summaryRouter } from "./routes/summary.route";
import { standingsRouter } from "./routes/standings.route";
import { scheduleRouter } from "./routes/schedule.route";
import { qualiRouter } from "./routes/quali.route";
import { practiceRouter } from "./routes/practice.route";
import { weatherRouter } from "./routes/weather.route";
import { youtubeRouter } from "./routes/youtube/youtube.route";

const router = express.Router();

export default (): express.Router => {
    summaryRouter(router);
    standingsRouter(router);
    scheduleRouter(router);
    qualiRouter(router);
    practiceRouter(router);
    weatherRouter(router);
    youtubeRouter(router);
    return router;
};
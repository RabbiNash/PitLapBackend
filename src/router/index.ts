import express from "express";

import { standingsRouter } from "./router";

const router = express.Router();

export default (): express.Router => {
    standingsRouter(router);
    return router;
};
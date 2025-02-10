import express from "express";

import { appRouter } from "./router";

const router = express.Router();

export default (): express.Router => {
    appRouter(router);
    return router;
};
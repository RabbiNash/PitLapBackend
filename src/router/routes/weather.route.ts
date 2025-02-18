import express from 'express';

import { getSessionWeatherSummary } from '../../controllers/weather/weatherController';

export const weatherRouter = (router: express.Router) => {
    router.get(
        '/weather/:year/:round/:session', 
        (req: express.Request, res: express.Response, next: express.NextFunction) => {
            getSessionWeatherSummary(req, res).catch(next);
        }
    );
    return router;
};

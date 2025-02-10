import express from 'express';

import { getDriverStandings } from '../controllers/driverStandings.controller';
import { getConstructorStandings } from '../controllers/constructorStandings.controller';

export const standingsRouter = (router: express.Router) => {
    router.get('/driver/standings', getDriverStandings);
    router.get('/constructor/standings', getConstructorStandings);
};

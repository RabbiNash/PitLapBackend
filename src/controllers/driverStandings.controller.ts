import express from 'express';

import { getStandings } from '../db/driverStandings.model';

export const getDriverStandings = async (req: express.Request, res: express.Response) => {
    try {
        const standings = await getStandings();
        if (standings.length === 0) {
            res.json({ message: 'No standings found' }).status(404).end();
            return;
        }

        res.json({
            'success': true,
            'data' : standings
        }).status(200).end();
    } catch (error) {
        console.error(error);
        res.json({
            message: 'Internal server error'
        }).status(500).end();
    }
};

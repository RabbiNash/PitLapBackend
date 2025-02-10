import express from 'express';

import { getStandings } from '../db/constructorStandings.model';

export const getConstructorStandings = async (req: express.Request, res: express.Response) => {
    try {
        const standings = await getStandings();

        if (standings.length === 0) {
            res.status(404);
            res.json({
                message: 'No standings found'
            });
            return;
        }
    
        res.json({
            'success': true,
            'data' : standings
        }).status(200).end();

    } catch (error) {
        console.error(error);
        res.status(500);
        res.json({
            message: 'Internal server error'
        });
    }
};

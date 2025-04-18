import express from 'express';

import { fetchTopSpeedByYearRoundAndEventName } from '../../../controllers/speeds/top-speed.controller';

export const topSpeedRouter = (router: express.Router) => {
    
   /**
     * @swagger
     * /speed/{year}/{round}/{eventName}:
     *   get:
     *     summary: Get top speeds of a session, these are the fastest speeds recorded in a session, through the speed trap.
     *     description: Retrieves the top speeds of a session by year, round and event name.
     *     tags:
     *       - Summary
     *     parameters:
     *       - in: path
     *         name: year
     *         required: true
     *         description: The year of the race schedule to retrieve.
     *         schema:
     *           type: string
     *           example: "2024"
     *       - in: path
     *         name: round
     *         required: true
     *         description: The year of the race schedule to retrieve.
     *         schema:
     *           type: string
     *           example: "1"
     *       - in: path
     *         name: eventName
     *         required: true
     *         description: The name of the practice session.
     *         schema:
     *           type: string
     *           example: "FP1"
     * 
     *     responses:
     *       200:
     *         description: Successfully retrieved the summary.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   type: object
     *                   properties:
     *                     key:
     *                         type: string
     *                     round:
     *                         type: integer
     *                     name:
     *                         type: string
     *                     year:
     *                         type: integer
     *                     speeds:
     *                         type: Object
     *                         properties:
     *                           driver:
     *                              type: string
     *                           topSpeed:
     *                              type: number
     *       404:
     *         description: No speed data found.
     *       500:
     *         description: Internal server error.
     */
    router.get('/speed/:year/:round/:eventName', fetchTopSpeedByYearRoundAndEventName);

    return router;
}

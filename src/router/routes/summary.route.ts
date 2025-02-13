import express from 'express';

import { getRaceSummaryByYearAndRound } from '../../controllers/race/summary/racesummary.controller';
import { getTrackSummary } from '../../controllers/race/summary/tracksummary.controller';

export const summaryRouter = (router: express.Router) => {
    
   /**
     * @swagger
     * /summary/race/{year}/{round}:
     *   get:
     *     summary: Get the summary of each race by year and round.
     *     description: Retrieves the summary of races by year and round.
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
     *                     summary:
     *                         type: string
     *       404:
     *         description: No summary found.
     *       500:
     *         description: Internal server error.
     */
    router.get('/summary/race/:year/:round', getRaceSummaryByYearAndRound);

   /**
     * @swagger
     * /summary/track/{trackName}:
     *   get:
     *     summary: Get the track summary and facts.
     *     description: Retrieves the summary of races by year and round.
     *     tags:
     *       - Summary
     *     parameters:
     *       - in: path
     *         name: trackName
     *         required: true
     *         description: The year of the race schedule to retrieve.
     *         schema:
     *           type: string
     *           example: "Bahrain"
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
     *                     summary:
     *                         type: string
     *       404:
     *         description: No summary found.
     *       500:
     *         description: Internal server error.
     */
    router.get('/summary/track/:trackName', getTrackSummary);

    return router;
}

import express from 'express';

import { fetchPracticeLapsByYearRoundAndEventName } from '../../controllers/practice/practicelaps.controller';

export const practiceRouter = (router: express.Router) => {
    
   /**
     * @swagger
     * /practice/{year}/{round}/{eventName}:
     *   get:
     *     summary: Get all laps of a practice session
     *     description: Retrieves the results of a practive session by year, round and practice.
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
     *                     summary:
     *                         type: string
     *       404:
     *         description: No summary found.
     *       500:
     *         description: Internal server error.
     */
    router.get('/practice/:year/:round/:eventName', fetchPracticeLapsByYearRoundAndEventName);

    return router;
}

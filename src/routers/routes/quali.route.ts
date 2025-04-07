import express from 'express';

import { getQualiResultsByYearAndRound } from '../../controllers/qualifiers/quali-results.controller';

export const qualiRouter = (router: express.Router) => {
    
   /**
     * @swagger
     * /quali/convectional/{year}/{round}:
     *   get:
     *     summary: Get the results of a quali session
     *     description: Retrieves the results of a quali session by year and round.
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
    router.get('/quali/convectional/:year/:round', getQualiResultsByYearAndRound);

   /**
     * @swagger
     * /quali/convectional/{year}/{round}:
     *   get:
     *     summary: Get the results of a quali session
     *     description: Retrieves the results of a quali session by year and round.
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
    router.get('/quali/sprint/:year/:round', getQualiResultsByYearAndRound);

    return router;
}

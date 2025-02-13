import express from 'express';

import { getDriverStandings } from '../../controllers/standings/driverStandings.controller';
import { getConstructorStandings } from '../../controllers/standings/constructorStandings.controller';
import { getTheoreticalDriverStandings } from '../../controllers/standings/theoreticalDriverStandings.controller';

export const standingsRouter = (router: express.Router) => {
    /**
     * @swagger
     * /standings/driver:
     *   get:
     *     summary: Retrieve the driver standings
     *     description: Get the list of driver standings including position, points, wins, etc.
     *     tags:
     *       - Standings
     *     responses:
     *       200:
     *         description: Successfully retrieved the standings.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       driverNumber:
     *                         type: integer
     *                         description: The driver’s number.
     *                       constructorName:
     *                         type: string
     *                         description: The constructor team name.
     *                       driverId:
     *                         type: string
     *                         description: The unique ID of the driver.
     *                       familyName:
     *                         type: string
     *                         description: The driver's family name.
     *                       givenName:
     *                         type: string
     *                         description: The driver's given name.
     *                       points:
     *                         type: integer
     *                         description: The current points of the driver.
     *                       position:
     *                         type: integer
     *                         description: The driver’s current position in the standings.
     *                       positionText:
     *                         type: string
     *                         description: A textual representation of the driver’s position.
     *                       wins:
     *                         type: integer
     *                         description: The total number of wins the driver has.
     *       404:
     *         description: No standings found.
     *       500:
     *         description: Internal server error.
     */
    router.get('/standings/driver', getDriverStandings);

    /**
     * @swagger
     * /standings/constructor:
     *   get:
     *     summary: Get the constructor standings.
     *     description: Retrieve the current constructor standings, including position, points, etc.
     *     tags:
     *       - Standings
     *     responses:
     *       200:
     *         description: Successfully retrieved the standings.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                      position:
     *                          type: integer
     *                      positionText:
     *                          type: string
     *                      points:
     *                          type: integer
     *                      wins:
     *                          type: integer
     *                      constructorId:
     *                          type: string
     *                      constructorName:
     *                         type: string
     * 
     *       404:
     *         description: No standings found.
     *       500:
     *         description: Internal server error.
     */
    router.get('/standings/constructor', getConstructorStandings);

    /**
     * @swagger
     * /standings/driver/theoretical:
     *   get:
     *     summary: Get the theoretical driver standings.
     *     description: Retrieve the theoretical driver standings, including position, points, etc.
     *     tags:
     *       - Standings
     *     responses:
     *       200:
     *         description: Successfully retrieved the standings.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                 data:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       position:
     *                         type: integer
     *                       name:
     *                         type: string
     *                       current_points:
     *                         type: integer
     *                       theoretical_max_points:
     *                         type: integer
     *                       can_win:
     *                         type: string
     *       404:
     *         description: No standings found.
     *       500:
     *         description: Internal server error.
     */
    router.get('/standings/driver/theoretical', getTheoreticalDriverStandings);

    return router;
};
import express from 'express';

import { getDriverStandings } from '../controllers/standings/driverStandings.controller';
import { getConstructorStandings } from '../controllers/standings/constructorStandings.controller';
import { getScheduleByYear } from '../controllers/schedule/raceweekend.controller';
import { getTheoreticalDriverStandings } from '../controllers/standings/theoreticalDriverStandings.controller';

export const appRouter = (router: express.Router) => {
    
    /**
     * @swagger
     * /standings/driver:
     *   get:
     *     summary: Retrieve the driver standings
     *     description: Get the list of driver standings including position, points, wins, etc.
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

    router.get('/standings/driver', getDriverStandings);

    /**
     * @swagger
     * /standings/constructor:
     *   get:
     *     summary: Get the constructor standings.
     *     description: Retrieve the current constructor standings, including position, points, etc.
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


    /**
     * @swagger
     * /schedule/{year}:
     *   get:
     *     summary: Retrieve the race schedule for a given year
     *     description: Get the list of race weekends for a specific year, including sessions and race results.
     *     parameters:
     *       - in: path
     *         name: year
     *         required: true
     *         description: The year of the race schedule to retrieve.
     *         schema:
     *           type: string
     *           example: "2024"
     *     responses:
     *       200:
     *         description: Successfully retrieved the race schedule.
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 success:
     *                   type: boolean
     *                   description: Indicates if the request was successful.
     *                 data:
     *                   type: array
     *                   items:
     *                     type: object
     *                     properties:
     *                       round:
     *                         type: integer
     *                         description: The round number of the race weekend.
     *                       country:
     *                         type: string
     *                         description: The country where the race is taking place.
     *                       officialEventName:
     *                         type: string
     *                         description: The official name of the event.
     *                       eventName:
     *                         type: string
     *                         description: The name of the event (e.g., "Grand Prix").
     *                       eventFormat:
     *                         type: string
     *                         description: The format of the event (e.g., "testing", "qualifying").
     *                       year:
     *                         type: string
     *                         description: The year of the event.
     *                       session1:
     *                         type: string
     *                         description: Name of the first session (e.g., "Practice 1").
     *                       session1DateUtc:
     *                         type: string
     *                         format: date-time
     *                         description: UTC date and time of the first session.
     *                       session2:
     *                         type: string
     *                         description: Name of the second session (e.g., "Practice 2").
     *                       session2DateUtc:
     *                         type: string
     *                         format: date-time
     *                         description: UTC date and time of the second session.
     *                       session3:
     *                         type: string
     *                         description: Name of the third session (e.g., "Practice 3").
     *                       session3DateUtc:
     *                         type: string
     *                         format: date-time
     *                         description: UTC date and time of the third session.
     *                       session4:
     *                         type: string
     *                         description: Name of the fourth session (if applicable).
     *                       session4DateUtc:
     *                         type: string
     *                         format: date-time
     *                         description: UTC date and time of the fourth session (if applicable).
     *                       session5:
     *                         type: string
     *                         description: Name of the fifth session (if applicable).
     *                       session5DateUtc:
     *                         type: string
     *                         format: date-time
     *                         description: UTC date and time of the fifth session (if applicable).
     *                       results:
     *                         type: array
     *                         items:
     *                           type: object
     *                           properties:
     *                             position:
     *                               type: integer
     *                               description: The position of the driver in the race result.
     *                             driver:
     *                               type: string
     *                               description: The driver’s identifier (e.g., "VER" for Verstappen).
     *                             headshotUrl:
     *                               type: string
     *                               description: URL of the driver’s headshot image.
     *                             points:
     *                               type: integer
     *                               description: Points awarded to the driver.
     *                             status:
     *                               type: string
     *                               description: The current status of the driver in the race (e.g., "Finished", "Retired").
     *                             gridPosition:
     *                               type: integer
     *                               description: The starting grid position of the driver.
     *                             teamColor:
     *                               type: string
     *                               description: The color representing the driver’s team.
     *                             broadcastName:
     *                               type: string
     *                               description: The broadcast name of the driver.
     *                             fullName:
     *                               type: string
     *                               description: The full name of the driver.
     *       404:
     *         description: No race schedule found for the given year.
     *       500:
     *         description: Internal server error.
     */
    router.get('/schedule/:year', getScheduleByYear);

}

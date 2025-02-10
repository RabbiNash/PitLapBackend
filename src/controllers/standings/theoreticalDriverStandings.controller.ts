import { Request, Response } from 'express';
import { getTheoreticalDriverStandings as fetchStandings } from '../../db/standings/theoreticalDriverStandings.model';
import { handleGetRequest } from '../../helpers/handleGetRequest';

/**
 * @swagger
 * /driver/standings:
 *   get:
 *     summary: Get the driver standings.
 *     description: Retrieve the current driver standings, including position, points, etc.
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

export const getTheoreticalDriverStandings = async (req: Request, res: Response): Promise<void> => {
    await handleGetRequest(fetchStandings, 'No standings found', 'Error fetching driver standings', res);
};

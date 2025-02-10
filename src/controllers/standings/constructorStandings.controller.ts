import { Request, Response } from 'express';
import { getStandings as fetchStandings } from '../../db/standings/constructorStandings.model';

/**
 * @swagger
 * /constructor/standings:
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
 *                       position:
 *                         type: integer
 *                       constructorName:
 *                         type: string
 *                       points:
 *                         type: integer
 *       404:
 *         description: No standings found.
 *       500:
 *         description: Internal server error.
 */
export const getConstructorStandings = async (req: Request, res: Response): Promise<void> => {
    try {
        const standings = await fetchStandings();

        if (!standings.length) {
            res.status(404).json({ success: false, message: 'No standings found' });
            return;
        }

        res.status(200).json({ success: true, data: standings });
    } catch (error) {
        console.error('Error fetching constructor standings:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

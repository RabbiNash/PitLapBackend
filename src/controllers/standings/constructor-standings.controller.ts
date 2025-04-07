import { Request, Response } from 'express';
import { getStandings as fetchStandings } from '../../models/standings/constructor-standings.model';

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

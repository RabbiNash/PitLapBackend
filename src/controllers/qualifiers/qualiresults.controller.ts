import { Request, Response } from 'express';
import { getQualiResultsByKey as fetchQualiResults } from '../../db/qualifiers/qualiResults.model';

export const getQualiResultsByYearAndRound = async (req: Request, res: Response): Promise<void> => {
    try {
        const { year, round } = req.params;
        const key = `${year}_${round}`;
        const summary = await fetchQualiResults(key);

        if (!summary) {
            res.status(404).json({ success: false, message: 'No result found' }).end();
            console.error('No result found for', key);
            return;
        }

        res.status(200).json({ success: true, data: summary }).end();
    } catch (error) {
        console.error('Error fetching')
    }
}
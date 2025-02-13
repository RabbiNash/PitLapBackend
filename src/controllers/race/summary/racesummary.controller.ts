import { Request, Response } from 'express';
import { getRaceSummary } from '../../../db/race/summary/racesummary.model';

export const getRaceSummaryByYearAndRound = async (req: Request, res: Response): Promise<void> => {
    try {
        const { year, round } = req.params;
        const key = `${year}_${round}`;
        const summary = await getRaceSummary(key);

        if (!summary) {
            res.status(404).json({ success: false, message: 'No summary found' }).end();
            console.error('No summary found for', key);
            return;
        }

        res.status(200).json({ success: true, data: summary }).end();
    } catch (error) {
        console.error('Error fetching')
    }
}
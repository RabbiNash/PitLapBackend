import { Request, Response } from 'express';
import { getRaceResult } from '../../../models/race/result/race-result.model';

export const fetchRaceResult = async (req: Request, res: Response): Promise<void> => {
    try {
        const { year, round } = req.params;
        const key = `${year}_${round}`;
        const result = await getRaceResult(key);

        if (!result) {
            res.status(404).json({ success: false, message: 'No result found' }).end();
            console.error('No result found for', key);
            return;
        }

        res.status(200).json({ success: true, data: result }).end();
    } catch (error) {
        console.error('Error fetching')
    }
}
import { Request, Response } from 'express';
import { getPracticeLapsByYearRoundAndEventName } from '../../db/practice/practicelaps.model';

export const fetchPracticeLapsByYearRoundAndEventName = async (req: Request, res: Response): Promise<void> => {
    try {
        const { year, round, eventName } = req.params;
        const numericYear = Number(year);
        const numericRound = Number(round);
        const laps = await getPracticeLapsByYearRoundAndEventName(numericYear, numericRound, eventName);

        if (!laps) {
            res.status(404).json({ success: false, message: 'No result found' }).end();
            console.error('No result found for', eventName, year, round);
            return;
        }

        res.status(200).json({ success: true, data: laps }).end();
    } catch (error) {
        const { year, round, eventName } = req.params;
        res.status(400).json({ success: false, message: 'Bad request'}).end();
        console.error('No result found for', eventName, year, round);
    }
}
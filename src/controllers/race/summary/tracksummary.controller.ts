import { Request, Response } from 'express';
import { getTrackSummary as fetchTrackSummary } from '../../../db/race/summary/tracksummary.model';

export const getTrackSummary = async (req: Request, res: Response): Promise<void> => {
    try {
        const { trackName } = req.params;
        const summary = await fetchTrackSummary(trackName);

        if (!summary) {
            res.status(404).json({ success: false, message: 'No summary found' }).end();
            console.error('No summary found for', trackName);
            return;
        }

        res.status(200).json({ success: true, data: summary }).end();
    } catch (error) {
        console.error('Error fetching')
        res.status(400).json({ success: false, message: 'Bad Request' }).end();
    }
}
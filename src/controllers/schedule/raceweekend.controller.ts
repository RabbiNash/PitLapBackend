import { Request, Response } from 'express';
import { getScheduleByYear as fetchSchedule } from '../../db/schedule/raceweekend.model';

export const getScheduleByYear = async (req: Request, res: Response): Promise<void> => {
    try {
        const { year } = req.params;

        const schedule = await fetchSchedule(year);

        if (!schedule.length) {
            res.status(404).json({ success: false, message: 'No Schedule found' });
            return;
        }

        res.status(200).json({ success: true, data: schedule });
    } catch (error) {
        console.error('Error fetching constructor standings:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

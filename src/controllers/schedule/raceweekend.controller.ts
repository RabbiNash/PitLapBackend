import { Request, Response } from 'express';
import { getScheduleByYear as fetchScheduleByYear } from '../../db/schedule/raceweekend.model';
import { getSchedule as fetchSchedule } from '../../db/schedule/raceweekend.model';
import { handleGetRequest } from '../../helpers/handleGetRequest';

export const getScheduleByYear = async (req: Request, res: Response): Promise<void> => {
    await handleGetRequest(fetchScheduleByYear, 'No Schedule found', 'Error fetching driver standings', res);
};

export const getSchedule = async (req: Request, res: Response): Promise<void> => {
    await handleGetRequest(fetchSchedule, 'No standings found', 'Error fetching driver standings', res);
};

import { Request, Response } from 'express';
import { getScheduleByYear as fetchScheduleByYear } from '../../models/schedule/race-weekend.model';
import { getSchedule as fetchSchedule } from '../../models/schedule/race-weekend.model';
import { handleGetRequest } from '../../helpers/handleGetRequest';

export const getScheduleByYear = async (req: Request, res: Response): Promise<void> => {
    await handleGetRequest(fetchScheduleByYear, 'No Schedule found', 'Error fetching driver standings', res);
};

export const getSchedule = async (req: Request, res: Response): Promise<void> => {
    await handleGetRequest(fetchSchedule, 'No standings found', 'Error fetching driver standings', res);
};

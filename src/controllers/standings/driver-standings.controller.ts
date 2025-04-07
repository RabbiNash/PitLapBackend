import { Request, Response } from 'express';
import { getStandings as fetchStandings } from '../../models/standings/driver-standings.model';
import { handleGetRequest } from '../../helpers/handleGetRequest';

export const getDriverStandings = async (req: Request, res: Response): Promise<void> => {
    await handleGetRequest(fetchStandings, 'No standings found', 'Error fetching driver standings', res);
};

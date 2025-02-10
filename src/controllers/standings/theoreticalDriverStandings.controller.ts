import { Request, Response } from 'express';
import { getTheoreticalDriverStandings as fetchStandings } from '../../db/standings/theoreticalDriverStandings.model';
import { handleGetRequest } from '../../helpers/handleGetRequest';

export const getTheoreticalDriverStandings = async (req: Request, res: Response): Promise<void> => {
    await handleGetRequest(fetchStandings, 'No standings found', 'Error fetching driver standings', res);
};

import { Request, Response } from 'express';
import { getCircuitByName } from '../../models/circuits/circuits.model';


export const fetchCircuitByName = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.params;
        const laps = await getCircuitByName(name);

        if (!laps) {
            res.status(404).json({ success: false, message: 'No result found' }).end();
            console.error('No result found for', name);
            return;
        }

        res.status(200).json({ success: true, data: laps }).end();
    } catch (error) {
        const { year, round, eventName } = req.params;
        res.status(400).json({ success: false, message: 'Bad request'}).end();
    }
}
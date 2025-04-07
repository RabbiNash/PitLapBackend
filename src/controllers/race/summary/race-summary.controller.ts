import { Request, Response } from 'express';
import { 
    getRaceSummary, 
    IRaceSummary, 
    upsertRaceSummary 
} from '../../../models/race/summary/race-summary.model';
import { getPerplexitySummary } from '../../perplexity/perplexity.controller';
import { getScheduleByYearAndRound } from '../../../models/schedule/race-weekend.model';
import moment from 'moment';

export const getRaceSummaryByYearAndRound = async (req: Request, res: Response): Promise<void> => {
    try {
        const { year, round } = req.params;
        const key = `${year}_${round}`;
        const numericYear = parseInt(year, 10);
        const numericRound = parseInt(round, 10);
        
        let summary = await getRaceSummary(key);
        
        if (!summary) {
            const schedule = await getScheduleByYearAndRound(year, numericRound);
            const dateToCheck = moment(schedule.session5DateUtc).add(1, 'day');
            if (!schedule || !moment().isAfter(dateToCheck)) {
                res.status(404).json({ success: false, message: 'Schedule not found' }).end();
                return;
            }

            const prompt = `Provide a summary of the ${numericYear} ${schedule.eventName} race, including the winner, podium finishers, fastest lap, and notable events during the race. Limit your response to 200 words. remove all markdown and citations.`;
            const raceSummary = await getPerplexitySummary(prompt, prompt);
            const aiSummary = raceSummary.choices.map((choice: any) => choice.message.content).join(' ');
            
            await upsertRaceSummary(mapToRaceSummary(key, numericRound, schedule.eventName, numericYear, aiSummary));
            let updatedSummary = await getRaceSummary(key);
            res.status(200).json({ success: true, data: updatedSummary }).end();
            return;
        }

        res.status(200).json({ success: true, data: summary }).end();
    } catch (error) {
        console.error('Error fetching race summary:', error);
        res.status(500).json({ success: false, message: 'Internal server error' }).end();
    }
};

const mapToRaceSummary = (
    key: string,
    round: number,
    name: string,
    year: number,
    summary: string
): IRaceSummary => ({
    key,
    round,
    name,
    year,
    summary
});
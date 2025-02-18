import { Request, Response } from 'express';
import axios from 'axios';
import { 
    getWeatherByYearAndRound,
    upsertWeather,
    IWeatherDocument,
    IWeatherBase
} from '../../db/weather/weather.model';
import { getScheduleByYearAndRound } from '../../db/schedule/raceweekend.model';
import dotenv from 'dotenv';
import { summariseWeatherInfo } from '../../controllers/ai/perplexityController';

dotenv.config();

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/3.0/onecall/day_summary';
const CLOUDY_THRESHOLD = 50;

interface WeatherSummaryResponse {
    lat: number;
    lon: number;
    tz: string;
    date: string;
    units: string;
    cloud_cover: { afternoon: number };
    humidity: { afternoon: number };
    precipitation: { total: number };
    temperature: { afternoon: number; min: number; max: number };
    pressure: { afternoon: number };
    wind: { max: { speed: number; direction: number } };
}

const mapToWeatherBase = (
    liveWeather: WeatherSummaryResponse,
    session: string,
    year: number,
    round: number,
    aiSummary: string
): IWeatherBase => ({
    round,
    session,
    year,
    temperature: liveWeather.temperature.afternoon,
    humidity: liveWeather.humidity.afternoon,
    windSpeed: liveWeather.wind.max.speed,
    condition: liveWeather.cloud_cover.afternoon > CLOUDY_THRESHOLD ? 'Cloudy' : 'Clear',
    summary: `Temp: ${liveWeather.temperature.afternoon}°C, Humidity: ${liveWeather.humidity.afternoon}%, Wind: ${liveWeather.wind.max.speed} m/s`,
    precipitation: liveWeather.precipitation.total,
    aiSummary: aiSummary
});

export const getSessionWeatherSummary = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { year, round, session } = req.params;
        
        if (!year || !round || !session) {
            return res.status(400).json({ 
                success: false,
                error: 'Missing required parameters: year, round, session' 
            });
        }

        const numericYear = parseInt(year, 10);
        const numericRound = parseInt(round, 10);
        
        let weather: IWeatherDocument | null = await getWeatherByYearAndRound(numericYear, numericRound);
        
        if (!weather) {
            const schedule = await getScheduleByYearAndRound(year, numericRound);
            const sessionDate = schedule.session5DateUtc == "" ? formatDateToShortDate(schedule.session3DateUtc) : formatDateToShortDate(schedule.session5DateUtc);
            const liveWeather = await axios.get<WeatherSummaryResponse>(BASE_URL, {
                params: {
                    lat: schedule.latitude,
                    lon: schedule.longitude,
                    date: sessionDate,
                    appid: API_KEY,
                    units: 'metric'
                }
            });

            if (!liveWeather.data) {
                throw new Error('Failed to retrieve weather data from external API');
            }

            const weatherSummary = await summariseWeatherInfo(JSON.stringify(liveWeather.data, null, 2));
            const aiSummary = weatherSummary.choices.map((choice: any) => choice.message.content).join(' ');

            const weatherBase = mapToWeatherBase(liveWeather.data, session, numericYear, numericRound, aiSummary);
            await upsertWeather(weatherBase);
            
            weather = await getWeatherByYearAndRound(numericYear, numericRound);
        }

        return res.status(200).json({ 
            success: true, 
            data: weather 
        });

    } catch (error) {
        console.error('Weather controller error:', error);
        const statusCode = error instanceof Error && error.message.includes('Missing') ? 400 : 500;
        return res.status(statusCode).json({
            success: false,
            error: error instanceof Error ? error.message : 'Internal server error'
        });
    }
};

function formatDateToShortDate(isoString: string): string {
    const date = new Date(isoString);
    return [
      date.getUTCFullYear(),
      (date.getUTCMonth() + 1).toString().padStart(2, '0'), // Months are 0-based
      date.getUTCDate().toString().padStart(2, '0')
    ].join('-');
  }
